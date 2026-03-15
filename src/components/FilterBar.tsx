import { Search, X } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ALL_SKILLS, SKILL_META } from '@/lib/skill-map'
import type { FilterState, SkillCategory } from '@/types'
import { hasActiveFilters } from '@/lib/filter-engine'

interface FilterBarProps {
  filters:  FilterState
  setSkill: (s: SkillCategory | null) => void
  setQuery: (q: string) => void
  clearAll: () => void
}

export default function FilterBar({ filters, setSkill, setQuery, clearAll }: FilterBarProps) {
  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
    },
    [setQuery],
  )

  const active = hasActiveFilters(filters)

  return (
    <div className="min-w-0 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          {ALL_SKILLS.map((skill) => {
            const meta = SKILL_META[skill]
            const on   = filters.skill === skill
            return (
              <button
                key={skill}
                type="button"
                onClick={() => setSkill(on ? null : skill)}
                aria-pressed={on}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium',
                  'transition-all duration-150 cursor-pointer',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  on
                    ? 'bg-primary text-white shadow-sm shadow-primary/20'
                    : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <span aria-hidden="true">{meta.icon}</span>
                {meta.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2 md:ml-auto w-full md:w-auto">
          {active && (
            <button
              type="button"
              onClick={clearAll}
              aria-label="Clear all filters"
              className={cn(
                'flex items-center justify-center rounded-full shrink-0',
                'bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted',
                'transition-all duration-150 cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'h-8 w-8',
                'md:w-auto md:px-3 md:gap-1.5 md:text-sm md:font-medium',
              )}
            >
              <X size={14} aria-hidden="true" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
          <div className="relative flex-1 md:flex-none min-w-0">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              value={filters.query}
              onChange={handleSearch}
              placeholder="Search issues…"
              aria-label="Search issues"
              className={cn(
                'h-8 pl-8 pr-3 rounded-full text-sm',
                'bg-muted/70 placeholder:text-muted-foreground',
                'border border-transparent focus:border-border focus:bg-card',
                'focus:outline-none transition-all duration-200',
                'w-full md:w-40 md:focus:w-60',
                'text-base md:text-sm',
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
