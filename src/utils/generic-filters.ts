export const toInFilter = (field: any): { $in: any[] } => {
  return { $in: Array.isArray(field) ? field : [field] };
};

export const toRegexFilter = (field: any): { $regex: string; $options: string } => {
  return { $regex: field, $options: 'i' };
};
