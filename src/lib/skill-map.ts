import type { SkillCategory } from '@/types'

export interface SkillMeta {
  label: string
  icon: string
  description: string
}

export const SKILL_META: Record<SkillCategory, SkillMeta> = {
  developer: {
    label: 'Developer',
    icon: '⚡',
    description: 'Code contributions: C#, TypeScript, APIs, Lightning',
  },
  writer: {
    label: 'Writer',
    icon: '✍️',
    description: 'Docs, tutorials, translations',
  },
  design: {
    label: 'Design',
    icon: '🎨',
    description: 'UI/UX, graphic design, CSS',
  },
  marketing: {
    label: 'Marketing',
    icon: '📣',
    description: 'Content, community, social media, SEO',
  },
}

export const ALL_SKILLS: SkillCategory[] = ['developer', 'writer', 'design', 'marketing']
