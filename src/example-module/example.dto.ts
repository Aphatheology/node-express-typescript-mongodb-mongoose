export interface CreateJobDto {
  title: string;
  description: string;
  stack: string[];
  companyName: string;
  location: string;
  workFrom: string;
  salary?: number;
  salaryCurrency?: string;
  salaryPer?: string;
  type: JobTypeEnum;
  employer: string;
}

export type UpdateJobDto = Partial<CreateJobDto>;

export enum JobTypeEnum {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  FREELANCE = "freelance",
  CONTRACT = "contract",
}

export enum JobStatus {
  APPROVED = "approved",
  DISAPPROVED = "disapproved",
  PENDING = "pending",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum SalaryCurrency {
  NGN = "NGN",
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export enum SalaryPer {
  YEAR = "year",
  MONTH = "month",
  HOUR = "hour",
  WEEK = "week",
}

export enum WorkFrom {
  REMOTE = "remote",
  ONSITE = "onsite",
  HYBRID = "hybrid",

}
