import Jobs, { IJob } from './example.model';
import ApiError from '../utils/ApiError';
import { CreateJobDto, UpdateJobDto } from './example.dto';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../users/user.model';
import Employer from '../users/employers/employer.model';
import { Pagination } from '../utils/pagination';

/**
 * Create a job
 * @param {IUser} user
 * @param {CreateJobDto} jobDto
 * @returns {Promise<IJob>}
 */
export const createJob = async (user: IUser | undefined, jobDto: CreateJobDto): Promise<IJob> => {
  const employer = await Employer.findOne({ user: user?.id });
  if (!employer || !employer?.companyName) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Create your Employer profile first');
  }

  jobDto.employer = employer.id;
  const job = await Jobs.create(jobDto)
  return job;
};

/**
 * Get all jobs for the logged in employer
 * @param {IUser} user
 * @returns {Promise<IJob[]>}
 */
export const getMyJobs = async (user: IUser | undefined): Promise<IJob[]> => {
  const jobs = await Jobs.find({ employer: user?.otherId });
  return jobs;
};

/**
 * Get all active jobs
 * @returns {Promise<IJob[]>}
 */
export const getJobs = async (query: Record<string, any>): Promise<{ items: IJob[]; page: number; totalPages: number; totalItems: number; hasNextPage: boolean }> => {
  let {page, limit, ...filter} = query;

  const modifiedFilter = Jobs.buildFilter(filter);

  const pipeline = Pagination<IJob>(page, limit, modifiedFilter);
  const jobs = await Jobs.aggregate(pipeline);

  return jobs[0] || { items: [], page: 1, totalPages: 0, totalItems: 0, hasNextPage: false };
};

/**
 * Get job by id
 * @param {string} jobId
 * @returns {Promise<IJob | null>}
 */
export const getJob = async (jobId: string): Promise<IJob> => {
  const job = await Jobs.findOne({ id: jobId });
  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job not found");
  }

  return job;
}

/**
 * Update job by id
 * @param {IUser} user
 * @param {string} jobId
 * @param {UpdateJobDto} jobDto
 * @returns {Promise<void>}
 */
export const updateJob = async (user: IUser | undefined, jobId: string, jobDto: UpdateJobDto): Promise<IJob> => {
  const job = await Jobs.findOne({ id: jobId, employer: user?.otherId });

  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job not found");
  }

  const updatedJob = await Jobs.findByIdAndUpdate(
    job.id,
    { $set: { ...jobDto } },
    { new: true, runValidators: true }
  );

  if (!updatedJob) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update job');
  }

  return updatedJob;
};

/**
 * Update the status of a job by its ID
 * @param {IUser} user
 * @param {string} jobId 
 * @param {JobStatus} status 
 * @returns {Promise<IJob>} 
 */
export const updateJobStatus = async (user: IUser | undefined, jobId: string, status: string): Promise<IJob> => {
  const job = await Jobs.findOne({ id: jobId, employer: user?.otherId });

  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job not found");
  }

  const updatedJob = await Jobs.findByIdAndUpdate(
    jobId,
    { status },
    { new: true, runValidators: true }
  );

  if (!updatedJob) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update job status');
  }

  return updatedJob;
};

/**
 * Delete job by id
 * @param {IUser} user
 * @param {string} jobId
 * @returns {Promise<void>}
 */
export const deleteJob = async (user: IUser | undefined, jobId: string): Promise<void> => {
  const job = await Jobs.findOne({ id: jobId, employer: user?.otherId });

  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job not found");
  }

  await job.deleteOne();
  return;
};