import { useState, lazy, Suspense } from 'react'
import type React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FilterBar from '@/components/FilterBar'
import IssueGrid from '@/components/IssueGrid'
import ResourcesSection from '@/components/ResourcesSection'
import Footer from '@/components/Footer'

const IssueModal = lazy(() => import('@/components/IssueModal'))
const preloadIssueModal = () => import('@/components/IssueModal')
import { useFilters } from '@/hooks/useFilters'
import { useIssues } from '@/hooks/useIssues'
import type { Issue } from '@/types'

export default function App() {
  const { filters, setSkill, setQuery, clearAll } = useFilters()
  const { filtered, status } = useIssues(filters)
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [slideFrom, setSlideFrom] = useState<'left' | 'bottom' | 'right'>('bottom')

  const handleIssueClick = (e: React.MouseEvent, issue: Issue) => {
    const { left, width } = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const third = window.innerWidth / 3
    const cardCenter = left + width / 2

    const direction = cardCenter < third ? 'left' : cardCenter > third * 2 ? 'right' : 'bottom'

    setSlideFrom(direction)
    setSelectedIssue(issue)
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-[4.5rem] pb-8">
        <Hero />

        <div id="issues" className="border-t border-border/60 pt-20 sm:pt-28 pb-10 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Pick an issue
          </h2>
          <p className="mt-4 text-muted-foreground max-w-sm mx-auto text-sm sm:text-base">
            Filter by skill and find something that excites you.
          </p>
        </div>

        <div>
          <div
            className="sticky top-16 z-40 py-4 bg-background/80 backdrop-blur-xl border-b border-border/40"
            style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <FilterBar
                filters={filters}
                setSkill={setSkill}
                setQuery={setQuery}
                clearAll={clearAll}
              />
            </div>
          </div>

          <IssueGrid
            issues={filtered}
            loading={status === 'loading'}
            onIssueClick={handleIssueClick}
            onIssueHover={preloadIssueModal}
          />
        </div>
        

        <ResourcesSection />
      </main>

      <Footer />

      <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/30" />}>
        <IssueModal
          issue={selectedIssue}
          slideFrom={slideFrom}
          onClose={() => setSelectedIssue(null)}
        />
      </Suspense>
    </>
  )
}
