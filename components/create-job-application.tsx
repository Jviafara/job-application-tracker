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
import { createJobApplication } from '@/lib/actions/job-applications-actions'

interface CreateJobApplication {
  columnId: string
  boardId: string
}

const INITIAL_JOB_APPLICATION = {
  company: '',
  position: '',
  location: '',
  notes: '',
  salary: '',
  jobUrl: '',
  tags: '',
  description: '',
}

const CreateJobApplication = ({ columnId, boardId }: CreateJobApplication) => {
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState(INITIAL_JOB_APPLICATION)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    try {
      const res = await createJobApplication({
        ...formData,
        columnId,
        boardId,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0),
      })

      if (!res.error) {
        setFormData(INITIAL_JOB_APPLICATION)
        setOpen(false)
      } else {
        console.log('Failed to create job application: ', res.error)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        className={
          cn(
            buttonVariants({
              variant: 'outline',
            }),
          ) +
          'w-full mb-4 justify-start text-muted-foreground border-dashed border-2 hover:border-solid hover:bg-muted/50'
        }
      >
        <Plus className='h-4 w-4 mr-2' /> Add Job
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form
          className='space-y-4'
          onSubmit={handleSubmit}
        >
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='company'>Company *</Label>
                <Input
                  id='company'
                  type='text'
                  required
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='position'>Position*</Label>
                <Input
                  id='position'
                  type='text'
                  required
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
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
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='salary'>Salary</Label>
                <Input
                  id='salary'
                  type='text'
                  placeholder='e.g., $100k - $150k'
                  value={formData.salary}
                  onChange={e => setFormData({ ...formData, salary: e.target.value })}
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
                value={formData.jobUrl}
                onChange={e => setFormData({ ...formData, jobUrl: e.target.value })}
                className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
              />
            </div>
            <div className=''>
              <Label htmlFor='tags'>Tags (comma-separated)</Label>
              <Input
                id='tags'
                type='text'
                placeholder='React, tailwing, NextJs'
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
              />
            </div>
            <div className=''>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                rows={3}
                placeholder='Brief description of the roll...'
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
              />
            </div>
            <div className=''>
              <Label htmlFor='notes'>Notes</Label>
              <Textarea
                id='notes'
                rows={4}
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
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
