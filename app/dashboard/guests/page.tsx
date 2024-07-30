import { getGuestList } from '@/lib/data'
import { getCurrentUser } from '@/lib/user'
import { Chip } from '@nextui-org/react'

export default async function GuestsPage() {
  const user = await getCurrentUser()
  const guests = await getGuestList(user.id)
  console.log(guests)

  return (
    <div className="w-full p-8">
      <h2 className="text-center text-xl">Guests attendees</h2>
      <div className="my-8 rounded-md border border-default-100">
        {guests
          .filter((guest) => guest.id)
          .map((guest) => (
            <div
              key={guest.id}
              className="flex gap-2 border-b border-default-100 p-2"
            >
              <span>
                <Chip size="sm" color="primary">
                  {guest.email}
                </Chip>
              </span>
              <span>
                <Chip size="sm">{guest.name}</Chip>
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
