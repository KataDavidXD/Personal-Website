export default function BlogLoading() {
  return (
    <div className="container-narrow py-16">
      <div className="mb-12 space-y-4">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-6 w-full max-w-md animate-pulse rounded-lg bg-muted" />
      </div>

      <div className="grid gap-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col space-y-3 rounded-2xl border border-border/40 p-6">
            <div className="flex items-center gap-2">
              <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
            </div>
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-muted" />
            <div className="h-5 w-full animate-pulse rounded-md bg-muted" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-12 animate-pulse rounded-md bg-muted" />
              <div className="h-6 w-12 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

