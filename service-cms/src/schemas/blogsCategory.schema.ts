import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import * as common from '../common/constants';

extendZodWithOpenApi(z);

export const getBlogsSchema = z.object({
  blog_id: z
    .string('blog id is required')
    .min(1, { message: 'blog id should be at least 1 character' })
    .optional(),
});

export const createBlogCategorySchema = z.object({
  title: z
    .string('title is required')
    .min(1, { message: 'Title should be at least 1 character' })
    .max(255, { message: 'Title should not exceed 255 characters' }),
  description: z
    .string('description is required')
    .min(1, { message: 'Description should be at least 1 character' })
    .max(500, { message: 'Description should not exceed 500 characters' }),
  slug: z
    .string('slug is required')
    .min(1, { message: 'Slug should be at least 1 character' })
    .max(45, { message: 'Slug should not exceed 45 characters' }),
});

export const updateBlogCategorySchema = z.object({
  title: z
    .string('title is required')
    .min(1, { message: 'Title should be at least 1 character' })
    .max(255, { message: 'Title should not exceed 255 characters' }),
  description: z
    .string('description is required')
    .min(1, { message: 'Description should be at least 1 character' })
    .max(500, { message: 'Description should not exceed 500 characters' }),
  slug: z
    .string('slug is required')
    .min(1, { message: 'Slug should be at least 1 character' })
    .max(45, { message: 'Slug should not exceed 45 characters' }),
});

export const updateSlugSchema = z.object({
  slug: z
    .string('slug is required')
    .min(1, { message: 'Slug should be at least 1 character' })
    .max(45, { message: 'Slug should not exceed 45 characters' }),
});

export const updateStatusSchema = z.object({
  status: z
    .boolean('status is required')
    .refine((val) => val !== undefined, { message: 'Status is required' }),
});

export const deleteBlogCategorySchema = z.object({
  ids: z
    .array(z.number('Each id must be a positive integer'))
    .min(1, { message: 'ids must be a non-empty array' }),
  action: z
    .string('action is required')
    .min(1, { message: 'Action is required' }),
});

export const listBlogCategorySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  searchTerm: z.string().optional(),
  sortingDirection: z.string().optional(),
  sortingKey: z.string().optional(),
  filterType: z.string().optional(),
  filterValue: z.string().optional(),
});

export const detailBlogCategorySchema = z.object({
  id: z
    .string('ID is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'ID must be a positive integer',
    }),
});

export const detailBySlugSchema = z.object({
  slug: z
    .string('slug is required')
    .min(1, { message: 'Slug is required' }),
});