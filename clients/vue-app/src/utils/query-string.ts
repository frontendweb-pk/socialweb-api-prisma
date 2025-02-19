import type { QueryParams } from '@/lib/types';

export const buildQueryString = (query: QueryParams) => {
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== '' && value !== undefined,
    ),
  );

  return new URLSearchParams(
    filteredQuery as Record<string, string>,
  ).toString();
};
