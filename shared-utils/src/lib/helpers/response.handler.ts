import { Response } from 'express';

export const handleResponse = <T>(
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
