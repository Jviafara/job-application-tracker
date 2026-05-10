'use client'
import { useEffect, useState } from 'react'
import { Board, Column, JobApplication } from '../models/models.types'
import { updateJobApplication } from '../actions/job-applications-actions'

export const useBoard = (initialBoard?: Board | null) => {
  const [board, setBoard] = useState<Board | null>(initialBoard || null)
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || [])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialBoard) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBoard(initialBoard)
      setColumns(initialBoard.columns || [])
    }
  }, [initialBoard])

  const moveJob = async (JobApplicationId: string, newColumnId: string, newOrder: number) => {
    setColumns(prev => {
      const newColumns = prev.map(col => ({
        ...col,
        JobApplications: [...col.jobApplications],
      }))

      // Find and remove job from the ald column
      let jobToMove: JobApplication | null = null
      let oldColumnId: string | null = null

      for (const col of newColumns) {
        const jobIndex = col.JobApplications.findIndex(j => j._id === JobApplicationId)

        if (jobIndex !== -1 && jobIndex !== undefined) {
          jobToMove = col.jobApplications[jobIndex]
          oldColumnId = col._id
          col.jobApplications = col.JobApplications.filter(job => job._id !== JobApplicationId)
          break
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(col => col._id === newColumnId)

        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex]
          const currentJobs = targetColumn.jobApplications || []

          const updateJobs = [...currentJobs]
          updateJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          })

          const jobsWithUpdatedOrders = updateJobs.map((job, idx) => ({
            ...job,
            order: idx * 100,
          }))

          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          }
        }
      }

      return newColumns
    })

    try {
      await updateJobApplication(JobApplicationId, { columnId: newColumnId, order: newOrder })
    } catch (err) {
      console.error(err)
    }
  }
  return { board, columns, error, moveJob }
}
