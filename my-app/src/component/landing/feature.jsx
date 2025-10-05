export default function Features() {
  return (
    <section className="w-full max-w-5xl px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Upload Plans"
          desc="Add your lesson plans as files or paste content; we support common formats."
        />
        <FeatureCard
          title="AI Compliance Check"
          desc="Run automated checks against your chosen curriculum and standards."
        />
        <FeatureCard
          title="Actionable Feedback"
          desc="Get clear, prioritized recommendations to address compliance gaps."
        />
      </div>
    </section>
  )
}

function FeatureCard({ title, desc }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  )
}
