import { Column, JobApplication } from '@/lib/models/models.types'
import { Card, CardContent } from './ui/card'
import { Span } from 'next/dist/trace'
import { ExternalLink } from 'lucide-react'

interface JobApplicationCardsProps {
  job: JobApplication
  columns: Column[]
}

const JobApplicationCard = ({ job, columns }: JobApplicationCardsProps) => {
  return (
    <>
      <Card>
        <CardContent>
          <div>
            <div>
              <h3>{job.position}</h3>
              <p>{job.company}</p>
              {job.description && <p>{job.description}</p>}
              {job.tags && job.tags.length > 0 && (
                <div>
                  {job.tags.map((tag, key) => (
                    <span key={key}>{tag}</span>
                  ))}
                </div>
              )}
              {job.jobUrl && (
                <a
                  target='_blank'
                  href={job.jobUrl}
                  onClick={e => e.stopPropagation()}
                >
                  <ExternalLink />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default JobApplicationCard
