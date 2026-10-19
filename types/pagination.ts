export enum SortOrderEnum {
  ASC = "asc",
  DESC = "desc",
}

export interface KeyAsString {
  [key: string]: string;
}

export type PaginationReq = {
  search?: string;
  sort: SortOrderEnum;
  sortBy: string;
  page?: number;
  take?: number;
};

export type IPaginationRes<T> = {
  total: number;
  per_page: number;
  current_page: number;
  previous_page: number;
  next_page: number;
  last_page: number;
  sort: SortOrderEnum;
  total_page: number;
  total_value: number;
  value: T[];
};

export type TInfiniteQueryResult<T> = {
  data: IPaginationRes<T>;
  pages: { data: IPaginationRes<T> }[];
  pageParams: number[];
};
