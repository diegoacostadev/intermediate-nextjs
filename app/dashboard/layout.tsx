'use client'
import Shell from '@/components/Shell'
import { usePathname } from 'next/navigation'

export default function Layout({
  children,
  events,
  rsvps,
}: {
  children: React.ReactNode
  events: React.ReactNode
  rsvps: React.ReactNode
}) {
  const path = usePathname()
  console.log(path)

  return (
    <Shell>
      {path == '/dashboard' ? (
        <div className="flex h-full w-full">
          <div className="w-1/2 border-r border-default-50">{rsvps}</div>
          <div className="flex w-1/2 flex-col">
            <div className="h-1/2 w-full border-b border-default-50">
              {events}
            </div>
            <div className="h-1/2 w-full">{children}</div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </Shell>
  )
}
