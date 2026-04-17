'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

// Emails that should automatically get instructor role
const INSTRUCTOR_EMAILS = [
  'moasamy@msa.edu.eg',
  'maashraf@msa.edu.eg',
  'fdarwish@msa.edu.eg',
  'soashraf@msa.edu.eg',
]

async function autoPromoteIfInstructor(email: string, userId: string) {
  if (INSTRUCTOR_EMAILS.includes(email.toLowerCase())) {
    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    await adminClient
      .from('profiles')
      .upsert({
        id: userId,
        full_name: email.split('@')[0],
        role: 'instructor',
      }, { onConflict: 'id' })
  }
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: authData } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // Provide a friendlier message for unconfirmed emails
    if (error.message.toLowerCase().includes('email not confirmed')) {
      redirect('/login?error=Email not confirmed. Please check your inbox (and spam folder) for the confirmation link.')
    }
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // Auto-promote instructor emails on login
  if (authData.user) {
    await autoPromoteIfInstructor(data.email, authData.user.id)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // MSA University Domain Verification
  if (!email.endsWith('@msa.edu.eg')) {
    redirect('/login?error=Only official MSA University emails (@msa.edu.eg) are permitted.')
  }

  const data = {
    email,
    password,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // After successful signup, show a message about email confirmation
  redirect('/login?success=Account created! Check your email inbox to confirm, then log in.')
}
