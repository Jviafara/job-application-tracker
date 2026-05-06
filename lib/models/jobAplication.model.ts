import mongoose, { Document, Schema } from 'mongoose'

export interface IJobAplication extends Document {
  company: string
  position: string
  location?: string
  status: string
  columnId: mongoose.Types.ObjectId
  boardId: mongoose.Types.ObjectId
  userId: string
  order: number
  notes?: string
  salary?: string
  jobUrl?: string
  appliedDate: Date
  tags?: string[]
  description?: string
  createdAt: Date
  updatedAt: Date
}

const jobApplicationSchema = new Schema<IJobAplication>(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: 'Applied',
    },
    columnId: {
      type: mongoose.Types.ObjectId,
      ref: 'Column',
      required: true,
      index: true,
    },
    boardId: {
      type: mongoose.Types.ObjectId,
      ref: 'Board',
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    notes: { type: String },
    salary: { type: String },
    jobUrl: { type: String },
    appliedDate: {
      type: Date,
      required: true,
    },
    tags: [{ type: String }],
    description: { type: String },
  },
  { timestamps: true },
)

export default mongoose.models.JobApplication || mongoose.model<IJobAplication>('JobApplication', jobApplicationSchema)
