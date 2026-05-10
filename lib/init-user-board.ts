import connectDB from './mongodb'
import { Board, Column } from './models'

const DEFAULT_COLUMNS = [
  {
    name: 'Wish List',
    order: 0,
  },
  {
    name: 'Applied',
    order: 1,
  },
  {
    name: 'Interviewing',
    order: 2,
  },
  {
    name: 'Offers',
    order: 3,
  },
  {
    name: 'Rejected',
    order: 4,
  },
]

export async function initUserBoard(userId: string) {
  try {
    await connectDB()

    //Check if board exists
    const existingBoard = await Board.findOne({ userId, name: 'Job Hunt' })

    if (existingBoard) {
      return existingBoard
    }

    //Create Board
    const newBoard = await Board.create({
      name: 'Job Hunt',
      userId,
      columns: [],
    })

    // Create default columns
    const defaultColumns = await Promise.all(
      DEFAULT_COLUMNS.map(col => {
        const newColumn = Column.create({
          name: col.name,
          order: col.order,
          boardId: newBoard._id,
        })
        return newColumn
      }),
    )

    newBoard.columns = defaultColumns.map(col => col._id)
    await newBoard.save()

    return newBoard
  } catch (error) {
    throw error
  }
}
