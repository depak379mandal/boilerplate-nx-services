import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import * as common from '../common/constants';

extendZodWithOpenApi(z);

// Existing Zod schemas
export const registerSchema = z.object({
  name: z
    .string('first name is required')
    .min(1, { message: 'Name should be at least 1 character' }),
});

export const getBlogsSchema = z.object({
  blog_id: z
    .string('blog id is required')
    .min(1, { message: 'blog id should be at least 1 character' })
    .optional(),
});

// Blog-related Zod schemas (keeping original method names)
export const createBlogValidation = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(500, 'Title must be less than 500 characters'),
  description: z.string().optional(),
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be valid (lowercase, hyphens allowed)'),
  thumbnail: z.string().optional(),
  components: z.any().optional(),
  css: z.any().optional(),
  pagedata: z.any().optional(),
  category: z.array(z.number()).optional(),
  status: z.boolean().optional(),
});

export const detailBlogValidation = z.object({
  id: z.string()
    .min(1, 'ID is required')
    .regex(/^\d+$/, 'ID must be a positive integer')
    .transform(val => parseInt(val)),
});

export const updateBlogValidation = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(500, 'Title must be less than 500 characters')
    .optional(),
  description: z.string().optional(),
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be valid (lowercase, hyphens allowed)')
    .optional(),
  thumbnail: z.string().optional(),
  components: z.any().optional(),
  css: z.any().optional(),
  pagedata: z.any().optional(),
  category: z.array(z.number()).optional()
});

export const statusBlogValidation = z.object({
  status: z.boolean('Status must be a boolean'),
});

export const slugBlogValidation = z.object({
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be valid (lowercase, hyphens allowed)'),
});

export const detailBySlugValidation = z.object({
  slug: z.string().min(1, 'Slug is required'),
});

export const blogIdsValidation = z.object({
  ids: z.array(z.number().positive('Each ID must be a positive integer'))
    .min(1, 'At least one ID is required'),
});

export const deleteBlogsValidation = z.object({
  ids: z.array(z.number().positive('Each ID must be a positive integer'))
    .min(1, 'At least one ID is required'),
  action: z.enum([common.DELETE_ACTIONS.TEMPORARY, common.DELETE_ACTIONS.PERMANENT, common.DELETE_ACTIONS.RESTORE]),
});

// Comment-related Zod schemas (keeping original method names)
export const createCommentValidation = z.object({
  blogId: z.number()
    .positive('Blog ID must be a positive integer'),
  comment: z.string()
    .min(1, 'Comment is required'),
  websiteUrl: z.string()
    .url('Website URL must be a valid URL')
    .optional(),
});

export const updateCommentStatusValidation = z.object({
  ids: z.array(z.number().positive('Each ID must be a positive integer'))
    .min(1, 'At least one ID is required'),
  status: z.boolean('Status must be a boolean'),
});

// List schemas with pagination (keeping original method names)
export const listBlogsValidation = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  searchTerm: z.string().optional(),
  sortingKey: z.string().optional(),
  sortingDirection: z.enum(['asc', 'desc']).optional(),
  filterType: z.string().optional(),
  filterValue: z.string().optional(),
});

export const listCommentsValidation = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  searchTerm: z.string().optional(),
  sortingKey: z.string().optional(),
  sortingDirection: z.enum(['asc', 'desc']).optional(),
  filterType: z.string().optional(),
  filterValue: z.string().optional(),
});

// Legacy validation schemas removed - now using Zod schemas with same names

