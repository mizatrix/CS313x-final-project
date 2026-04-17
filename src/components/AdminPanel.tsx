"use client";

import { useState } from 'react';

interface Team {
  id: string;
  team_name: string;
  project_id: number;
  members: string[];
  created_at: string;
  profiles: { full_name: string; student_id: string } | null;
  submissions: { id: string; github_url: string; status: string; grade: number | null; feedback: string | null; created_at: string }[];
}

interface Submission {
  id: string;
  github_url: string;
  status: string;
  grade: number | null;
  feedback: string | null;
  created_at: string;
  teams: { team_name: string; project_id: number; members: string[] } | null;
  profiles: { full_name: string; student_id: string } | null;
}

interface ProjectInfo {
  id: number;
  title: string;
}

export default function AdminPanel({
  teams,
  submissions,
  projectsMap,
  stats,
}: {
  teams: Team[];
  submissions: Submission[];
  projectsMap: Record<number, ProjectInfo>;
  stats: { totalTeams: number; totalSubmissions: number; graded: number; pending: number; totalStudents: number };
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'teams' | 'submissions'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter(t =>
    t.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (projectsMap[t.project_id]?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.members?.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSubmissions = submissions.filter(s =>
    (s.teams?.team_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.profiles?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.github_url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CSV Export — Teams
  const exportTeamsCSV = () => {
    const headers = ['Team Name', 'Project ID', 'Project Title', 'Leader', 'Leader Student ID', 'Members', 'Registered At', 'Submission Status', 'GitHub URL', 'Grade', 'Feedback'];
    const rows = teams.map(t => {
      const sub = t.submissions?.[0];
      return [
        t.team_name,
        t.project_id,
        projectsMap[t.project_id]?.title || '',
        t.profiles?.full_name || '',
        t.profiles?.student_id || '',
        (t.members || []).join(' | '),
        new Date(t.created_at).toLocaleDateString(),
        sub?.status || 'Not submitted',
        sub?.github_url || '',
        sub?.grade ?? '',
        sub?.feedback || '',
      ];
    });
    downloadCSV(headers, rows, 'cs313x_teams_export.csv');
  };

  // CSV Export — Submissions
  const exportSubmissionsCSV = () => {
    const headers = ['Team Name', 'Project ID', 'Project Title', 'Submitted By', 'GitHub URL', 'Status', 'Grade', 'Feedback', 'Submitted At'];
    const rows = submissions.map(s => [
      s.teams?.team_name || '',
      s.teams?.project_id || '',
      projectsMap[s.teams?.project_id || 0]?.title || '',
      s.profiles?.full_name || '',
      s.github_url,
      s.status,
      s.grade ?? '',
      s.feedback || '',
      new Date(s.created_at).toLocaleDateString(),
    ]);
    downloadCSV(headers, rows, 'cs313x_submissions_export.csv');
  };

  // CSV Export — All Students
  const exportStudentsCSV = () => {
    const headers = ['Team Name', 'Project Title', 'Member Name / ID', 'Role'];
    const rows: (string | number)[][] = [];
    teams.forEach(t => {
      // Leader
      rows.push([
        t.team_name,
        projectsMap[t.project_id]?.title || '',
        t.profiles?.full_name || 'Unknown Leader',
        'Team Leader',
      ]);
      // Members
      (t.members || []).forEach(m => {
        rows.push([
          t.team_name,
          projectsMap[t.project_id]?.title || '',
          m,
          'Member',
        ]);
      });
    });
    downloadCSV(headers, rows, 'cs313x_students_export.csv');
  };

  function downloadCSV(headers: string[], rows: (string | number)[][], filename: string) {
    const escape = (val: string | number) => `"${String(val).replace(/"/g, '""')}"`;
    const csvContent = [headers.map(escape).join(','), ...rows.map(r => r.map(escape).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Teams', value: stats.totalTeams, icon: 'fa-users', color: '#3b82f6' },
          { label: 'Students', value: stats.totalStudents, icon: 'fa-user-graduate', color: '#06b6d4' },
          { label: 'Submissions', value: stats.totalSubmissions, icon: 'fa-code', color: '#f59e0b' },
          { label: 'Graded', value: stats.graded, icon: 'fa-check-circle', color: '#22c55e' },
          { label: 'Pending', value: stats.pending, icon: 'fa-clock', color: '#ef4444' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <i className={`fa-solid ${s.icon}`} style={{ fontSize: '1.5rem', color: s.color, marginBottom: '0.5rem', display: 'block' }}></i>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs + Search + Export */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        {(['overview', 'teams', 'submissions'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn ${activeTab === tab ? 'primary-btn' : 'secondary-btn'}`}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', textTransform: 'capitalize' }}
          >
            <i className={`fa-solid ${tab === 'overview' ? 'fa-chart-pie' : tab === 'teams' ? 'fa-users' : 'fa-code'}`} style={{ marginRight: '0.4rem' }}></i>
            {tab}
          </button>
        ))}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search teams, students..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '0.85rem', minWidth: '200px' }}
          />
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              className="btn secondary-btn"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={() => {
                const menu = document.getElementById('export-menu');
                if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
              }}
            >
              <i className="fa-solid fa-download" style={{ marginRight: '0.4rem' }}></i> Export CSV
            </button>
            <div id="export-menu" style={{ display: 'none', position: 'absolute', right: 0, top: '100%', marginTop: '0.25rem', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', zIndex: 50, minWidth: '180px' }}>
              <button onClick={exportTeamsCSV} style={{ display: 'block', width: '100%', padding: '0.6rem 1rem', background: 'none', border: 'none', color: 'white', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem' }}>
                <i className="fa-solid fa-users" style={{ marginRight: '0.5rem', color: '#3b82f6' }}></i> Teams Report
              </button>
              <button onClick={exportSubmissionsCSV} style={{ display: 'block', width: '100%', padding: '0.6rem 1rem', background: 'none', border: 'none', color: 'white', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem' }}>
                <i className="fa-solid fa-code" style={{ marginRight: '0.5rem', color: '#f59e0b' }}></i> Submissions Report
              </button>
              <button onClick={exportStudentsCSV} style={{ display: 'block', width: '100%', padding: '0.6rem 1rem', background: 'none', border: 'none', color: 'white', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem' }}>
                <i className="fa-solid fa-user-graduate" style={{ marginRight: '0.5rem', color: '#06b6d4' }}></i> All Students
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>
            <i className="fa-solid fa-circle-info" style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }}></i>
            Student Registration Fields
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            When students register their team on the dashboard, they fill in the following fields:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              { field: 'Team Name', desc: 'A unique name for their project team', icon: 'fa-signature', required: true },
              { field: 'Project Selection', desc: 'Choose from 80 available IR project topics (auto-blocks duplicates)', icon: 'fa-list-check', required: true },
              { field: 'Team Members', desc: 'Up to 5 members — Name and Student ID per line', icon: 'fa-users', required: false },
              { field: 'GitHub Repository URL', desc: 'Submitted separately after team registration', icon: 'fa-brands fa-github', required: true },
            ].map(f => (
              <div key={f.field} style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <i className={`fa-solid ${f.icon}`} style={{ color: 'var(--primary-color)' }}></i>
                  <strong>{f.field}</strong>
                  {f.required && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 600 }}>REQUIRED</span>}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>
            <i className="fa-solid fa-database" style={{ marginRight: '0.5rem', color: '#f59e0b' }}></i>
            Data Stored per Team
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600 }}>Field</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600 }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['team_name', 'VARCHAR', 'The team\'s chosen display name'],
                ['project_id', 'INTEGER', 'ID of the selected project topic (1–80)'],
                ['leader_id', 'UUID', 'Auth ID of the team leader (auto-set from login)'],
                ['members', 'JSONB', 'Array of member strings (e.g. "Ahmed Ali - 2110001")'],
                ['github_url', 'TEXT', 'GitHub repo URL (via submission form)'],
                ['status', 'VARCHAR', 'pending → graded (set by instructor)'],
                ['grade', 'NUMERIC', '0–100 score (set by instructor)'],
                ['feedback', 'TEXT', 'Instructor feedback text'],
              ].map(([field, type, desc]) => (
                <tr key={field} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '0.6rem', fontFamily: 'monospace', color: 'var(--primary-color)', fontSize: '0.85rem' }}>{field}</td>
                  <td style={{ padding: '0.6rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{type}</td>
                  <td style={{ padding: '0.6rem', fontSize: '0.85rem' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TEAMS TAB */}
      {activeTab === 'teams' && (
        <div className="glass-card" style={{ padding: '2rem', overflowX: 'auto' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>
            <i className="fa-solid fa-users" style={{ marginRight: '0.5rem', color: '#3b82f6' }}></i>
            All Teams ({filteredTeams.length})
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>#</th>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Team Name</th>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Project</th>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Leader</th>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Members</th>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Registered</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <i className="fa-solid fa-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}></i>
                    {searchTerm ? 'No matching teams found.' : 'No teams registered yet.'}
                  </td>
                </tr>
              ) : filteredTeams.map((t, idx) => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{idx + 1}</td>
                  <td style={{ padding: '0.75rem' }}><strong>{t.team_name}</strong></td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ color: 'var(--primary-color)' }}>{projectsMap[t.project_id]?.title || `#${t.project_id}`}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {t.profiles?.full_name || 'Unknown'}
                    {t.profiles?.student_id && <><br/><small style={{ color: 'var(--text-muted)' }}>{t.profiles.student_id}</small></>}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {(t.members || []).length > 0 ? (
                      <div style={{ fontSize: '0.85rem' }}>
                        {t.members.map((m, i) => (
                          <div key={i} style={{ padding: '0.15rem 0', color: 'var(--text-muted)' }}>
                            <i className="fa-solid fa-user" style={{ marginRight: '0.3rem', fontSize: '0.7rem', color: 'var(--accent-color)' }}></i>{m}
                          </div>
                        ))}
                      </div>
                    ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {t.submissions?.length > 0 ? (
                      <span style={{
                        padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
                        background: t.submissions[0].status === 'graded' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)',
                        color: t.submissions[0].status === 'graded' ? '#4ade80' : '#facc15',
                      }}>
                        {t.submissions[0].status} {t.submissions[0].grade != null ? `(${t.submissions[0].grade}/100)` : ''}
                      </span>
                    ) : (
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: 'rgba(107,114,128,0.15)', color: '#9ca3af' }}>
                        Not submitted
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUBMISSIONS TAB */}
      {activeTab === 'submissions' && (
        <div className="glass-card" style={{ padding: '2rem', overflowX: 'auto' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>
            <i className="fa-solid fa-code" style={{ marginRight: '0.5rem', color: '#f59e0b' }}></i>
            All Submissions ({filteredSubmissions.length})
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Team</th>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Project</th>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>GitHub</th>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Grade & Feedback</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <i className="fa-solid fa-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}></i>
                    {searchTerm ? 'No matching submissions found.' : 'No submissions yet.'}
                  </td>
                </tr>
              ) : filteredSubmissions.map(sub => (
                <tr key={sub.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <strong>{sub.teams?.team_name}</strong><br/>
                    <small style={{ color: 'var(--text-muted)' }}>by: {sub.profiles?.full_name || 'Unknown'}</small>
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--primary-color)' }}>
                    {projectsMap[sub.teams?.project_id || 0]?.title || `#${sub.teams?.project_id}`}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <a href={sub.github_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <i className="fa-brands fa-github"></i> View Code
                    </a>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
                      background: sub.status === 'graded' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)',
                      color: sub.status === 'graded' ? '#4ade80' : '#facc15',
                    }}>{sub.status}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <form action="/actions/grade-submission" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <input type="hidden" name="submission_id" value={sub.id} />
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input type="number" name="grade" placeholder="0-100" min={0} max={100} defaultValue={sub.grade ?? ''} style={{ width: '75px', padding: '0.4rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', textAlign: 'center' }} />
                        <button type="submit" className="btn primary-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                          <i className="fa-solid fa-check"></i>
                        </button>
                      </div>
                      <input type="text" name="feedback" placeholder="Feedback..." defaultValue={sub.feedback || ''} style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '0.8rem' }} />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
