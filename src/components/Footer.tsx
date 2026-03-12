import SupporterSprite from '@/components/SupporterSprite'
import { supporters } from '@/data/supporters'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 relative">
        <SupporterSprite />
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 sm:gap-6 items-center justify-items-center">
          {supporters.map((s) => (
            <a
              key={s.svgId}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              className="flex items-center justify-center w-full h-8 sm:h-10 opacity-50 hover:opacity-100 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg
                role="img"
                aria-label={s.name}
                width={s.width}
                height={s.height}
                className="max-h-6 sm:max-h-8 w-auto max-w-full shrink-0"
                style={s.fillCurrentColor ? { fill: 'currentColor' } : undefined}
              >
                <use href={`#${s.svgId}`} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
