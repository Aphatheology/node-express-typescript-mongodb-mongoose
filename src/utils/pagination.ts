import { PipelineStage, FilterQuery } from 'mongoose';

export const Pagination = <T extends Record<string, any>>(
  page: string = '1',
  limit: string = '10',
  filter: FilterQuery<T> = {}
): PipelineStage[] => {
  
  const skip = (Number(page) - 1) * Number(limit);

  return [
    {
      $match: {
        ...filter,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $facet: {
        total: [
          {
            $count: 'count',
          },
        ],
        data: [],
      },
    },
    {
      $unwind: {
        path: '$total',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        items: {
          $slice: ['$data', skip, Number(limit)],
        },
        page: {
          $literal: Math.floor(skip / Number(limit)) + 1,
        },
        hasNextPage: {
          $lt: [{ $multiply: [Number(limit), Number(page)] }, '$total.count'],
        },
        totalPages: {
          $ceil: {
            $divide: ['$total.count', Number(limit)],
          },
        },
        totalItems: '$total.count',
      },
    },
  ];
};
