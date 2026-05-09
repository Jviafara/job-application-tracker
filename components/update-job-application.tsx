'use client'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Dispatch, SetStateAction, useState } from 'react'
import { JobApplication } from '@/lib/models/models.types'
import { updateJobApplication } from '@/lib/actions/job-applications-actions'

interface UpdateJobApplication {
  job: JobApplication
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
}

const UpdateJobApplication = ({ job, editing, setEditing }: UpdateJobApplication) => {
  const [formData, setFormData] = useState({
    company: job.company || '',
    position: job.position || '',
    location: job.location || '',
    notes: job.notes || '',
    salary: job.salary || '',
    jobUrl: job.jobUrl || '',
    columnId: job.columnId || '',
    tags: job.tags?.join(', ') || '',
    description: job.description || '',
  })

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    try {
      const res = await updateJobApplication(job._id, {
        ...formData,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0),
      })

      if (!res.error) {
        setEditing(false)
      } else {
        console.log('Failed to update job application: ', res.error)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog
      open={editing}
      onOpenChange={setEditing}
    >
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Update Job Application</DialogTitle>
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
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateJobApplication
