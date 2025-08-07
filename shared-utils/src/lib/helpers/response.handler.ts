import { Response } from 'express';

export interface PaginateResponseInput<T> {
  data: T[];
  limit: number;
  page: number;
  total: number;
}

export interface PaginateResponse<T> {
  totalPages: number;
  numberOfRows: number;
  currentPage: number;
  limit: number;
  totalRecords: number;
  paginatedResults: T[];
  meta?: Record<string, any>;
}


export interface PaginateQueryOptions {
  sortingKeys?: string[];
  filterKeys?: string[];
  defaultSortingKey?: string;
}

export interface PaginateQueryResult {
  page: number;
  limit: number;
  skip: number;
  sortingDirection: 'asc' | 'desc'; 
  sortingKey: string;
  filterType?: string;
  filterValue?: any[];
}



export const handleResponse1 = <T>(
  {
    data,
    message,
    statusCode,
  }: { data?: T; message: string; statusCode: number },
  res: Response
) => {
  return res.status(statusCode).json({
    data,
    message,
  });
};

export const handleResponse = <T>(
  {
    data,
    message,
    statusCode,
    status = statusCode >= 200 && statusCode < 400, // ✅ auto-calculate if not passed
  }: { data?: T; message: string; statusCode: number; status?: boolean },
  res: Response
) => {
  return res.status(statusCode).json({
    data,
    message,
    statusCode,
    status,
  });
};


export const OkResponse = <T>(
  {
    data,
    message,
    statusCode = 200,
  }: { data?: T; message: string; statusCode: number },
  res: Response
) => handleResponse({ data, message, statusCode }, res);

export const CreatedResponse = <T>(
  { data, message }: { data?: T; message: string },
  res: Response
) => {
  console.log("CreatedResponse: ", data);
  return handleResponse({ data, message, statusCode: 201 }, res);
};

export const ErrorResponse = (
  { message }: { message: string },
  res: Response
) => handleResponse({ message, statusCode: 500 }, res);

export const NotFoundResponse = (
  { message }: { message: string },
  res: Response
) => handleResponse({ message, statusCode: 404 }, res);

export const BadRequestResponse = (
  { message }: { message: string },
  res: Response
) => handleResponse({ message, statusCode: 400 }, res);

export const UnauthorizedResponse = (
  { message }: { message: string },
  res: Response
) => handleResponse({ message, statusCode: 401 }, res);

export const ForbiddenResponse = (
  { message }: { message: string },
  res: Response
) => handleResponse({ message, statusCode: 403 }, res);

export const UnprocessableEntityResponse = <T>(
  { message, data }: { message: string; data?: T },
  res: Response
) => handleResponse({ message, statusCode: 422, data }, res);

export const InternalServerErrorResponse = (
  { message }: { message: string },
  res: Response
) => handleResponse({ message, statusCode: 500 }, res);

export const paginationResponse = <T>(
  {
    data,
    message,
    total,
    limit,
    page,
  }: {
    data: T;
    message: string;
    total: number;
    limit: number;
    page: number;
  },
  res: Response
) =>
  handleResponse(
    {
      data: {
        rows: data,
        total,
        limit,
        page,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
      },
      message,
      statusCode: 200,
    },
    res
  );

  export const paginateResponse = <T>(
    {
      data,
      limit,
      page,
      total,
    }: PaginateResponseInput<T>,
    metaData: Record<string, any> = {}
  ): PaginateResponse<T> => {
    return {
      totalPages: Math.ceil(total / limit),
      numberOfRows: data.length,
      currentPage: page,
      limit,
      totalRecords: total,
      paginatedResults: data,
      meta: metaData,
    };
  };



export const paginateQuery = (
  query: any,
  options: PaginateQueryOptions = {
    sortingKeys: ["created_at"],
    filterKeys: [],
    defaultSortingKey: "created_at"
  }
): PaginateQueryResult => {
  const {
    sortingKeys = ["created_at"],
    filterKeys = [],
    defaultSortingKey = "created_at"
  } = options;

  const computedPage = parseInt(query.page) || 1;
  const page = computedPage < 1 ? 1 : computedPage;

  const parsedLimit = parseInt(query.limit) || 10;
  const limit = parsedLimit > 500 ? 500 : parsedLimit;

  const skip = (page - 1) * limit;

  const sortingDirection: 'asc' | 'desc' = (query.sortingDirection?.toUpperCase() === "ASC") ? 'asc' : 'desc';
  const sortingKey = sortingKeys.includes(query.sortingKey) ? query.sortingKey : defaultSortingKey;

  const filterType = filterKeys.includes(query.filterKey) ? query.filterKey : undefined;
  const filterValue = query.filterValue ? query.filterValue : [];

  let parsedFilterValue: any[] = [];
  if (typeof filterValue === 'string') {
    parsedFilterValue = JSON.parse(filterValue);
    // Ensure it's an array
    if (!Array.isArray(parsedFilterValue)) {
      parsedFilterValue = [parsedFilterValue];
    }
  }

  return {
    page,
    limit,
    skip,
    sortingDirection,
    sortingKey,
    filterType,
    filterValue: parsedFilterValue
  };
};
