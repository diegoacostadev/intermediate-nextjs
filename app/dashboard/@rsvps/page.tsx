import { getRsvpsForDashboard } from '@/lib/data'
import { getCurrentUser } from '@/lib/user'
import { Chip, ChipProps } from '@nextui-org/react'
import Link from 'next/link'

const statusColors = {
  going: 'primary',
  maybe: 'warning',
  'not-going': 'danger',
}

export default async function RsvpsSlot() {
  const user = await getCurrentUser()
  const data = await getRsvpsForDashboard(user.id)

  return (
    <div className="flex h-full w-full justify-center p-4">
      <div className="w-full">
        <h2 className="text-center text-xl">Latest RSVPs</h2>
        <div className="my-8 rounded-md border border-default-100">
          {data.map(({ rsvps, events, attendees }) => (
            <div
              key={rsvps?.id}
              className="flex gap-2 border-b border-default-100 p-2"
            >
              <span>{attendees.name}</span>
              <span>
                <Chip
                  size="sm"
                  color={
                    statusColors[
                      rsvps?.status || 'maybe'
                    ] as keyof ChipProps['color']
                  }
                >
                  {rsvps?.status}
                </Chip>
              </span>
              <span>
                <Link href={`/dashboard/events/${events?.id}`}>
                  <Chip size="sm" variant="faded">
                    {events?.name}
                  </Chip>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
