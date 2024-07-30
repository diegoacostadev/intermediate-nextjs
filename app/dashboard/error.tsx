'use client'

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something bad happened! {error.message}</h2>
      <button onClick={() => reset()}>Try again.</button>
    </div>
  )
}
