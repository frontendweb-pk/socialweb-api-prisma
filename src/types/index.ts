export interface QueryString {
  search?: string;
  page?: string | number;
  limit?: string | number;
  sort?: string;
  order?: "asc" | "desc";
}
