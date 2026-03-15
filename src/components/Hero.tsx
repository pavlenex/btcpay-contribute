
export default function Hero() {
  return (
    <section aria-label="Overview" className="py-16 sm:py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-display font-bold tracking-tight leading-[1.05] text-foreground">
          Start contributing<br />to{' '}
          <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
            ₿itcoin.
          </span>
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-xl mx-auto">
          Find your first issue across the entire BTCPay ecosystem.
          Developer, writer, designer, or marketer. There's a spot for you.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#issues"
            className="inline-flex items-center gap-2 rounded-full px-8 h-11 sm:h-12 text-sm sm:text-base font-semibold text-primary-foreground bg-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:bg-primary/90 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Pick an issue
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full px-8 h-11 sm:h-12 text-sm sm:text-base font-semibold border border-border/60 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  )
}
