import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { projectsData } from '@/data/projects'
import AdminPanel from '@/components/AdminPanel'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Authenticate user and verify role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'instructor') {
    redirect('/dashboard')
  }

  // Build project lookup map
  const projectsMap: Record<number, { id: number; title: string }> = {}
  projectsData.forEach(p => { projectsMap[p.id] = { id: p.id, title: p.title } })

  // Fetch all teams with leader profiles and submissions
  const { data: teams } = await supabase
    .from('teams')
    .select(`
      *,
      profiles!leader_id ( full_name, student_id ),
      submissions ( id, github_url, status, grade, feedback, created_at )
    `)
    .order('created_at', { ascending: false })

  // Fetch all submissions with team and submitter details
  const { data: submissions } = await supabase
    .from('submissions')
    .select(`
      *,
      teams ( team_name, project_id, members ),
      profiles!submitted_by ( full_name, student_id )
    `)
    .order('created_at', { ascending: false })

  // Calculate stats
  const totalTeams = teams?.length || 0
  const totalSubmissions = submissions?.length || 0
  const graded = submissions?.filter(s => s.status === 'graded').length || 0
  const pending = totalSubmissions - graded
  const totalStudents = (teams || []).reduce((acc, t) => {
    return acc + 1 + (Array.isArray(t.members) ? t.members.length : 0)
  }, 0)

  return (
    <>
      <header className="glass-nav">
        <div className="container">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className="logo">
              <i className="fa-solid fa-magnifying-glass-chart"></i> MSA CS313x <span>IR Hub</span>
            </h1>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/#projects">Projects</Link>
            <form action="/auth/signout" method="post" style={{ display: 'inline' }}>
              <button className="btn secondary-btn" type="submit" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                <i className="fa-solid fa-right-from-bracket" style={{ marginRight: '0.4rem' }}></i> Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="section-header">
          <div>
            <span className="badge" style={{ marginBottom: '0.5rem', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>Instructor Panel</span>
            <h2 style={{ marginTop: '0.5rem' }}>Admin Dashboard</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              <i className="fa-solid fa-user-shield" style={{ marginRight: '0.3rem' }}></i>
              Signed in as {user.email}
            </p>
          </div>
        </div>

        <AdminPanel
          teams={teams || []}
          submissions={submissions || []}
          projectsMap={projectsMap}
          stats={{ totalTeams, totalSubmissions, graded, pending, totalStudents }}
        />
      </div>
    </>
  )
}
