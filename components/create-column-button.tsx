'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { createColumn } from '@/lib/actions/column.actions'

interface CreateColumn {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

const CreateColumnButton = ({ modalOpen, setModalOpen }: CreateColumn) => {
  const [name, setName] = useState('')

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    try {
      //   const board = await getBoard()
      await createColumn(name)

      setName('')
      setModalOpen(false)
    } catch (err) {
      console.error('Failed to create column!', err)
    }
  }
  return (
    <Dialog
      open={modalOpen}
      onOpenChange={setModalOpen}
    >
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Add new column</DialogTitle>
          <DialogDescription>Each column represent the state for the job aplications.</DialogDescription>
        </DialogHeader>
        <form
          className='space-y-4'
          onSubmit={handleSubmit}
        >
          <div className='space-y-4'>
            <Label htmlFor='company'>Name</Label>
            <Input
              id='company'
              type='text'
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
            />
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Add Column</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateColumnButton
