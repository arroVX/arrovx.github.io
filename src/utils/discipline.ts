const FRONT_KEYWORDS = [
  'react', 'next', 'vue', 'angular', 'svelte', 'figma', 'tailwind',
  'frontend', 'front-end', 'ui', 'ux', 'photoshop', 'illustrator',
  'design', 'photography', 'poster', 'branding', 'art',
]

const BACK_KEYWORDS = [
  'laravel', 'node', 'express', 'firebase', 'supabase', 'mysql',
  'postgres', 'database', 'backend', 'back-end', 'api', 'php',
  'prisma', 'graphql',
]

type ProjectLike = {
  tech?: string[] | string | Record<string, unknown>
  category?: string
  role?: string
  discipline?: string
  [key: string]: unknown
}

function techList(project: ProjectLike | null | undefined): string[] {
  const tech = project?.tech
  const arr = Array.isArray(tech)
    ? tech
    : typeof tech === 'string'
      ? tech.split(',')
      : []
  return arr.map((t) => String(t).toLowerCase())
}

/** Kembalikan 'FRONTEND' | 'BACKEND' | 'FULLSTACK' untuk sebuah project. */
export function getDiscipline(project: ProjectLike | null | undefined): 'FRONTEND' | 'BACKEND' | 'FULLSTACK' {
  if (project?.discipline && typeof project.discipline === 'string') {
    const d = project.discipline.trim().toUpperCase()
    if (d === 'FRONTEND' || d === 'BACKEND' || d === 'FULLSTACK') return d
  }
  const techs = [...techList(project), String(project?.category || '').toLowerCase()]
  const hasFront = techs.some((t) => FRONT_KEYWORDS.some((k) => t.includes(k)))
  const hasBack = techs.some((t) => BACK_KEYWORDS.some((k) => t.includes(k)))
  if (hasFront && hasBack) return 'FULLSTACK'
  if (hasBack) return 'BACKEND'
  return 'FRONTEND'
}

export function disciplineLabel(d: string) {
  const map: Record<string, string> = { FRONTEND: 'Frontend', BACKEND: 'Backend', FULLSTACK: 'Fullstack' }
  return map[d] || 'Frontend'
}

export function roleLabel(project: ProjectLike | null | undefined) {
  if (project?.role) return project.role
  return `${disciplineLabel(getDiscipline(project))} Developer`
}
