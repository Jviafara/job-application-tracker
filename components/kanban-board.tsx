'use client'

import { Board, Column, JobApplication } from '@/lib/models/models.types'
import { Award, Calendar, CheckCircle2, Mic, MoreVertical, Trash2, XCircle } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import CreateJobApplication from './create-job-application'
import JobApplicationCard from './job-aplication-card'

interface KanbanBoardProps {
  board: Board
  userId: string
}

interface ColConfig {
  color: string
  icon: React.ReactNode
}

const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: 'bg-cyan-500',
    icon: <Calendar className='h-4 w-4' />,
  },
  {
    color: 'bg-purple-500',
    icon: <CheckCircle2 className='h-4 w-4' />,
  },
  {
    color: 'bg-green-500',
    icon: <Mic className='h-4 w-4' />,
  },
  {
    color: 'bg-yellow-500',
    icon: <Award className='h-4 w-4' />,
  },
  {
    color: 'bg-red-500',
    icon: <XCircle className='h-4 w-4' />,
  },
]

function DroppableCollumn({
  column,
  config,
  boardId,
  sortedColumns,
}: {
  column: Column
  config: ColConfig
  boardId: string
  sortedColumns: Column[]
}) {
  const sortedJobs = column.jobApplications?.sort((a, b) => a.order - b.order) || []

  return (
    <Card className='min-w-75 shrink-0 shadow-md p-0'>
      <CardHeader className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {config.icon}
            <CardTitle className='text-white text-base font-semibold'>{column.name}</CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className='h-6 w-6 text-white hover:bg-white/20 rounded-full' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem className='text-destructive'>
                <Trash2 className='mr-2 h-4 w-4' />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='space-y-2 bg-gray-50 min-h-100 rounded-b-lg'>
        {sortedJobs.map((job, key) => (
          <SortableJobCard
            key={key}
            job={{ ...job, columnId: job.columnId || column._id }}
            columns={sortedColumns}
          />
        ))}
        <CreateJobApplication
          columnId={column._id}
          boardId={boardId}
        />
      </CardContent>
    </Card>
  )
}

const SortableJobCard = ({ job, columns }: { job: JobApplication; columns: Column[] }) => {
  return (
    <div>
      <JobApplicationCard
        job={job}
        columns={columns}
      />
    </div>
  )
}

const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
  const columns = board.columns
  const sortedColumns = columns?.sort((a, b) => a.order - b.order)

  return (
    <>
      <div className='space-y-4'>
        <div className='p-10'>
          {columns.map((col, key) => {
            const config = COLUMN_CONFIG[key] || {
              color: 'bg-cyan-500',
              icon: <Calendar className='h-4 w-4' />,
            }
            return (
              <DroppableCollumn
                key={key}
                column={col}
                config={config}
                boardId={board._id}
                sortedColumns={sortedColumns}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default KanbanBoard
