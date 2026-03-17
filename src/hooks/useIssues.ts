import { useEffect, useMemo, useState } from 'react'
import type { IssuesData, FilterState } from '@/types'
import { filterIssues } from '@/lib/filter-engine'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useIssues(filters: FilterState) {
  const [data, setData] = useState<IssuesData | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const controller = new AbortController()

    fetch('/data/issues.json', { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<IssuesData>
      })
      .then((d) => {
        setData(d)
        setStatus('success')
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        console.error('[useIssues] failed to load issues.json:', err)
        setStatus('error')
      })
    return () => controller.abort()
  }, [])

  const filtered = useMemo(
    () => (data ? filterIssues(data.issues, filters) : []),
    [data, filters],
  )

  const testerFiltered = useMemo(
    () => (data ? filterIssues(data.testerItems ?? [], filters) : []),
    [data, filters],
  )

  const writerFiltered = useMemo(
    () => (data ? filterIssues(data.writerIssues ?? [], filters) : []),
    [data, filters],
  )

  return { filtered, testerFiltered, writerFiltered, status }
}
