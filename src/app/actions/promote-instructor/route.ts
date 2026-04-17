import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// One-time setup route to promote an email to instructor
// Access: POST /actions/promote-instructor with { email, secret }
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, secret } = body

  // Simple secret to prevent unauthorized access
  if (secret !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Find the user by email
  const { data: users, error: lookupError } = await adminClient.auth.admin.listUsers()
  if (lookupError) {
    return NextResponse.json({ error: lookupError.message }, { status: 500 })
  }

  const targetUser = users.users.find(u => u.email === email)
  if (!targetUser) {
    return NextResponse.json({ error: `User with email ${email} not found. They need to sign up first.` }, { status: 404 })
  }

  // Upsert instructor role
  const { error: upsertError } = await adminClient
    .from('profiles')
    .upsert({
      id: targetUser.id,
      full_name: targetUser.user_metadata?.full_name || email.split('@')[0],
      role: 'instructor',
    }, { onConflict: 'id' })

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    message: `${email} promoted to instructor`,
    user_id: targetUser.id 
  })
}
