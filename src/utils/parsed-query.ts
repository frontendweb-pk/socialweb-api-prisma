import { Prisma } from "@prisma/client";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import { QueryString } from "../types";

export const parsedQuery = (query: QueryString, attrs: string[]) => {
  const page = isNaN(Number(query.page)) ? DEFAULT_PAGE : Number(query.page);
  const limit = isNaN(Number(query.limit))
    ? DEFAULT_LIMIT
    : Number(query.limit);
  const sort: string = (
    attrs.includes(query.sort || "") ? query.sort : "role_id"
  ) as string;
  const order = query.order === "desc" ? "desc" : "asc";
  const search = query.search || "";

  // where
  const where: Prisma.RoleWhereInput = search
    ? { role_name: { contains: search, mode: "insensitive" } }
    : {};

  return {
    page,
    limit,
    sort,
    order,
    search,
    where,
  };
};
