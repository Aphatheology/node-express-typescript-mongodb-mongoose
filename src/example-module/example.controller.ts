import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import * as jobService from './example.service';
import { StatusCodes } from 'http-status-codes';
import { CustomRequest } from 'middlewares/auth';

export const createJob = catchAsync(async (req: CustomRequest, res: Response) => {
  const job = await jobService.createJob(req.user, req.body);
  res.status(StatusCodes.CREATED).send(job);
});

export const getMyJobs = catchAsync(async (req: CustomRequest, res: Response) => {
  const result = await jobService.getMyJobs(req.user);
  res.send(result);
});

export const getJobs = catchAsync(async (req: Request, res: Response) => {
  const result = await jobService.getJobs(req.query);
  res.send(result);
});

export const getJob = catchAsync(async (req: Request, res: Response) => {
  const job = await jobService.getJob(req.params.jobId);
  res.send(job);
});

export const updateJob = catchAsync(async (req: CustomRequest, res: Response) => {
  const job = await jobService.updateJob(req.user, req.params.jobId, req.body);
  res.send(job);
});

export const updateJobStatus = catchAsync(async (req: CustomRequest, res: Response) => {
  const job = await jobService.updateJobStatus(req.user, req.params.jobId, req.params.jobStatus);
  res.send(job);
});

export const deleteJob = catchAsync(async (req: CustomRequest, res: Response) => {
  await jobService.deleteJob(req.user, req.params.jobId);
  res.send();
});