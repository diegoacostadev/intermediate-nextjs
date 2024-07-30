import { getAttendeesCountForDashboard } from '@/lib/data'
import { getCurrentUser } from '@/lib/user'

export default async function Dashboard() {
  const user = await getCurrentUser()
  const total = await getAttendeesCountForDashboard(user.id)
  // throw new Error('Not implemented')

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div>
        <h4 className="text-lg">Attendees</h4>
        <h2 className="my-8 text-center text-6xl font-semibold">{total}</h2>
      </div>
    </div>
  )
}
