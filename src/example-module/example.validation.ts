import Joi from 'joi';
import { objectId } from '../utils/custom.validation';
import { JobStatus, JobTypeEnum, SalaryCurrency, SalaryPer, WorkFrom } from './example.dto';

export const createJob = {
  body: Joi.object().keys({
    title: Joi.string().min(3).max(150).required(),
    companyName: Joi.string().required(),
    stack: Joi.array().items(Joi.string()).optional(),
    description: Joi.string().min(50).required(),
    location: Joi.string().required(),
    salary: Joi.number().positive().optional(),
    salaryCurrency: Joi.string().valid(...Object.values(SalaryCurrency)).optional(),
    salaryPer: Joi.string().valid(...Object.values(SalaryPer)).optional(),
    workFrom: Joi.string().valid(...Object.values(WorkFrom)).required(),
    type: Joi.string().valid(...Object.values(JobTypeEnum)).required(),
  }),
};

export const getWithId = {
  params: Joi.object().keys({
    jobId: Joi.string().required(),
  }),
};

export const updateJob = {
  body: Joi.object()
    .keys({
      title: Joi.string().min(3).max(150).optional(),
      companyName: Joi.string().optional(),
      stack: Joi.array().items(Joi.string()).optional(),
      description: Joi.string().min(50).optional(),
      location: Joi.string().optional(),
      salary: Joi.number().positive().optional(),
      salaryCurrency: Joi.string().valid(...Object.values(SalaryCurrency)).optional(),
      salaryPer: Joi.string().valid(...Object.values(SalaryPer)).optional(),
      workFrom: Joi.string().valid(...Object.values(WorkFrom)).optional(),
      jobType: Joi.string().valid(...Object.values(JobTypeEnum)).optional(),
    })
    .or(
      "title",
      "companyName",
      "stack",
      "description",
      "location",
      "salary",
      "salaryCurrency",
      "salaryPer",
      "workFrom",
      "jobType"
    ),
  params: Joi.object().keys({
    jobId: Joi.string().required().custom(objectId),
  }),
};

export const updateJobStatus = {
  params: Joi.object().keys({
    jobId: Joi.string().required(),
    JobStatus: Joi.string().required().valid(...Object.values(JobStatus)),
  }),
};
