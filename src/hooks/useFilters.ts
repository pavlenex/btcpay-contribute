import { useCallback, useEffect, useState } from 'react'
import type { FilterState, SkillCategory } from '@/types'
import { sanitizeFilters } from '@/lib/filter-engine'

function readFromURL(): FilterState {
  const params = new URLSearchParams(window.location.search)
  return sanitizeFilters({
    skill:  params.get('skill') ?? undefined,
    tags:   params.get('tags')?.split(',').filter(Boolean) ?? [],
    repos:  params.get('repos')?.split(',').filter(Boolean) ?? [],
    query:  params.get('q') ?? '',
  })
}

function writeToURL(filters: FilterState) {
  const params = new URLSearchParams()
  if (filters.skill)          params.set('skill',  filters.skill)
  if (filters.tags.length)    params.set('tags',   filters.tags.join(','))
  if (filters.repos.length)   params.set('repos',  filters.repos.join(','))
  if (filters.query.trim())   params.set('q',      filters.query.trim())
  const search = params.toString()
  const url = search ? `?${search}` : window.location.pathname
  window.history.replaceState(null, '', url)
}

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(readFromURL)

  // Sync to URL whenever filters change
  useEffect(() => { writeToURL(filters) }, [filters])

  const setSkill = useCallback((skill: SkillCategory | null) => {
    setFilters((prev) => ({ ...prev, skill, tags: [] })) // reset tags on skill change
    document.getElementById('issues')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const setQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, query }))
  }, [])

  const clearAll = useCallback(() => {
    setFilters({ skill: null, tags: [], repos: [], query: '' })
  }, [])

  return { filters, setSkill, setQuery, clearAll }
}
