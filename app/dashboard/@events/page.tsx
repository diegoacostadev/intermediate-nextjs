import { getEventsForDashboard } from '@/lib/data'
import { getCurrentUser } from '@/lib/user'
import { Chip, ChipProps } from '@nextui-org/react'
import Link from 'next/link'

const statusColors = {
  draft: 'warning',
  live: 'success',
  started: 'primary',
  ended: 'disabled',
  canceled: 'danger',
}

export default async function EventsSlot() {
  const user = await getCurrentUser()
  const events = await getEventsForDashboard(user.id)

  return (
    <div className="flex h-full w-full justify-center p-4">
      <div className="w-full">
        <h2 className="text-center text-xl">{'Latest Events'}</h2>
        <div className="my-8 rounded-md border border-default-100">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex gap-2 border-b border-default-100 p-2"
            >
              <Link href={`/dashboard/events/${event.id}`}>
                <span>{event.name}</span>
              </Link>
              <span>
                <Chip
                  size="sm"
                  color={statusColors[event.status] as keyof ChipProps['color']}
                >
                  {event.status}
                </Chip>
              </span>
              <span>
                <Chip size="sm">{event.name}</Chip>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
