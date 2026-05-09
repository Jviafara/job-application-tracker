import KanbanBoard from '@/components/kanban-board'
import { getSession } from '@/lib/auth/auth'
import { Board } from '@/lib/models'
import connectDB from '@/lib/mongodb'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const getBoard = async (userId: string) => {
  'use cache'
  await connectDB()
  const res = await Board.findOne({ userId, name: 'Job Hunt' }).populate({
    path: 'columns',
    populate: {
      path: 'jobApplications',
    },
  })

  if (!res) return null

  return JSON.parse(JSON.stringify(res))
}

const DashboardpageWrapper = async () => {
  const session = await getSession()

  if (!session?.user) {
    redirect('/sign-in')
  }

  const board = await getBoard(session.user.id ?? '')

  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto p-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-black'>{board.name}</h1>
          <p className='text-gray-600'>Track your job applications.</p>
        </div>
      </div>
      <KanbanBoard board={board} />
    </div>
  )
}

const Dashboard = async () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardpageWrapper />
    </Suspense>
  )
}

export default Dashboard
