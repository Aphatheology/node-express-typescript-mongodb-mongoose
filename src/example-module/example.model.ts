import mongoose, { Schema, Document, FilterQuery, Model } from 'mongoose';
import { toRegexFilter, toInFilter } from '../utils/generic-filters';
import { SalaryCurrency, SalaryPer, JobTypeEnum, JobStatus, WorkFrom } from './example.dto';

export interface IJob extends Document {
  title: string;
  stack: string[];
  companyName: string;
  description: string;
  location: string;
  salary: number;
  salaryCurrency: SalaryCurrency;
  salaryPer: SalaryPer;
  jobType: JobTypeEnum;
  status: JobStatus; 
  employer: mongoose.Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

interface IJobModel extends Model<IJob> {
  buildFilter(filter: Record<string, any>): FilterQuery<IJob>;
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    stack: { type: [String] },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number },
    salaryCurrency: { type: String, enum: SalaryCurrency },
    salaryPer: { type: String, enum: SalaryPer },
    workFrom: { type: String, enum: WorkFrom, required: true },
    type: { type: String, enum: JobTypeEnum, required: true },
    status: { type: String, enum: JobStatus, required: true, default: JobStatus.PENDING },
    employer: { type: Schema.Types.ObjectId, ref: 'Employer', required: true },
  },
  { timestamps: true }
);

JobSchema.statics.buildFilter = function (filter: Record<string, any>): FilterQuery<IJob> {
  const modifiedFilter: FilterQuery<IJob> = {};

  if(filter.workFrom) modifiedFilter.workFrom = toInFilter(filter.workFrom);
  if(filter.stack) modifiedFilter.stack = toInFilter(filter.stack);
  if(filter.salaryCurrency) modifiedFilter.salaryCurrency = toInFilter(filter.salaryCurrency);

  if(filter.title) modifiedFilter.title = toRegexFilter(filter.title);
  if(filter.location) modifiedFilter.location = toRegexFilter(filter.location);

  if (filter.minSalary || filter.maxSalary) {
    modifiedFilter.salary = {};
    if (filter.minSalary) modifiedFilter.salary.$gte = Number(filter.minSalary);
    if (filter.maxSalary) modifiedFilter.salary.$lte = Number(filter.maxSalary);
  }

  return modifiedFilter;
};

const Jobs = mongoose.model<IJob, IJobModel>('Jobs', JobSchema);

export default Jobs;
