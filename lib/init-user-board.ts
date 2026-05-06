import connectDB from './mongodb'
import './models'

export async function initUserBoard(userId: string) {
  try {
    await connectDB()

    //Check if board exists
    

  } catch (error) {
    throw error
  }
}
