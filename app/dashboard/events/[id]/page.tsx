import { getEvent } from '@/lib/data'
import { getCurrentUser } from '@/lib/user'
import { Chip, ChipProps } from '@nextui-org/react'
import { redirect } from 'next/navigation'

const statusColors = {
  draft: 'warning',
  live: 'success',
  started: 'primary',
  ended: 'disabled',
  canceled: 'danger',
}

export default async function EventsPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await getCurrentUser()
  const event = await getEvent(user.id, id)

  if (!event) redirect('/dashboard/events')

  return (
    <div className="w-full p-8">
      <div className="my-8 rounded-md border border-default-100">
        <div className="flex gap-2 border-b border-default-100 p-2">
          <h2 className="text-center text-xl">{event.name}</h2>
          <span>
            <Chip
              size="sm"
              color={statusColors[event.status] as keyof ChipProps['color']}
            >
              {event.status}
            </Chip>
          </span>
        </div>
      </div>
    </div>
  )
}
