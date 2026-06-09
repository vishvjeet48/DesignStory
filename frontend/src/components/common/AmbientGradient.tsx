export function AmbientGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-1/3 top-[-10%] h-[70vh] w-[70vw] rounded-full bg-brown/15 blur-[140px] dark:bg-brown-light/8" />
      <div className="absolute -right-1/4 top-[30%] h-[50vh] w-[55vw] rounded-full bg-olive-muted/12 blur-[120px]" />
      <div className="absolute bottom-[-15%] left-1/3 h-[45vh] w-[50vw] rounded-full bg-[#3d2f24]/40 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.6]"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(198, 167, 123, 0.08), transparent 60%)',
        }}
      />
    </div>
  )
}
