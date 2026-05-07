import KanbanBoard from '@/components/kanban-board'
import { getSession } from '@/lib/auth/auth'
import { Board } from '@/lib/models'
import connectDB from '@/lib/mongodb'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const session = await getSession()

  if (!session?.user) {
    redirect('/sign-in')
  }

  await connectDB()

  const res = await Board.findOne({ userId: session.user.id, name: 'Job Hunt' }).populate({
    path: 'columns',
    populate: {
      path: 'jobApplications',
    },
  })
  const board = JSON.parse(JSON.stringify(res))

  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto p-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-black'>{board.name}</h1>
          <p className='text-gray-600'>Track your job applications.</p>
        </div>
      </div>
      <KanbanBoard
        board={board}
        userId={session.user.id}
      />
    </div>
  )
}

export default Dashboard
