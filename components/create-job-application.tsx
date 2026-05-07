'use client'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useState } from 'react'

interface CreateJobApplication {
  columnId: string
  boardId: string
}

const CreateJobApplication = ({ columnId, boardId }: CreateJobApplication) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: 'outline',
          }),
        )}
      >
        <Plus /> Add Job
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form className='space-y-4'>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='company'>Company *</Label>
                <Input
                  id='company'
                  type='text'
                  required
                  className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='position'>Position*</Label>
                <Input
                  id='position'
                  type='text'
                  required
                  className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  type='text'
                  className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='salary'>Salary</Label>
                <Input
                  id='salary'
                  type='text'
                  placeholder='e.g., $100k - $150k'
                  className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
                />
              </div>
            </div>
            <div className=''>
              <Label htmlFor='jobUrl'>Job URL</Label>
              <Input
                id='jobUrl'
                type='text'
                placeholder='https://...'
                className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
              />
            </div>
            <div className=''>
              <Label htmlFor='tags'>Tags (comma-separated)</Label>
              <Input
                id='tags'
                type='text'
                placeholder='React, tailwing, NextJs'
                className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
              />
            </div>
            <div className=''>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                rows={3}
                placeholder='Brief description of the roll...'
                className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
              />
            </div>
            <div className=''>
              <Label htmlFor='notes'>Notes</Label>
              <Textarea
                id='notes'
                rows={4}
                className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Add Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateJobApplication
