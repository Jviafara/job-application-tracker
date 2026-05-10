'use server'

import { revalidatePath } from 'next/cache'
import { getSession } from '../auth/auth'
import { Board, Column, JobApplication } from '../models'

export const getBoard = async () => {
  const session = await getSession()
  if (!session?.user) return { error: 'Unauthorized' }

  try {
    const board = await Board.findOne({ userId: session.user.id })
    if (!board) return { error: 'Board not found' }
    if (session?.user.id !== board.userId) return { error: 'Unauthorized' }

    return JSON.parse(JSON.stringify(board))
  } catch (err) {
    console.error('Failed to find the board', err)
  }
}

export const createColumn = async (name: string) => {
  const session = await getSession()
  if (!session?.user) return { error: 'Unauthorized' }

  try {
    const board = await Board.findOne({ userId: session.user.id })
    if (!board) return { error: 'Board not found' }
    if (session?.user.id !== board.userId) return { error: 'Unauthorized' }

    const order = board.columns.length

    const newColumn = {
      name,
      order,
      boardId: board._id,
      jobAplications: [],
    }

    const res = await Column.create(newColumn)
    await Board.findByIdAndUpdate(board._id, {
      $push: { columns: res._id },
    })

    revalidatePath('/dashboard')
    return { success: true, msg: 'Column created successfully!' }
  } catch (err) {
    console.error('Failed to create the column!', err)
  }
}

export const deleteColumn = async (id: string) => {
  const session = await getSession()
  if (!session?.user) return { error: 'Unauthorized' }

  try {
    const column = await Column.findById(id).populate({
      path: 'boardId',
    })
    if (!column) return { error: 'Column not found' }
    if (session?.user.id !== column.boardId.userId) return { error: 'Unauthorized' }

    await Column.deleteOne({ _id: id })

    for (const job of column.jobApplications) {
      //   const jobId = job.toString()
      await JobApplication.deleteOne({ _id: job })
    }

    await Board.findByIdAndUpdate(column.boardId, {
      $pull: {
        columns: id,
      },
    })

    revalidatePath('/dashboard')
  } catch (err) {
    console.error('Failed to delete the Column', err)
  }
}
