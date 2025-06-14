export class PaginateResulteDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
