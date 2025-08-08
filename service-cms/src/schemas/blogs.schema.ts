import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import * as common from '../common/constants';
import { ValidationMessages } from '../common/message';

extendZodWithOpenApi(z);

// Existing Zod schemas
export const registerSchema = z.object({
  name: z
    .string(ValidationMessages.TITLE_REQUIRED)
    .min(1, { message: ValidationMessages.TITLE_STRING }),
});

export const getBlogsSchema = z.object({
  blog_id: z
    .string(ValidationMessages.BLOG_ID_REQUIRED)
    .min(1, { message: ValidationMessages.BLOG_ID_REQUIRED })
    .optional(),
});

// Blog-related Zod schemas (keeping original method names)
export const createBlogValidation = z.object({
  title: z.string()
    .min(1, ValidationMessages.TITLE_REQUIRED)
    .max(500, ValidationMessages.TITLE_MAX_LENGTH),
  description: z.string().optional(),
  slug: z.string()
    .min(1, ValidationMessages.SLUG_REQUIRED)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, ValidationMessages.SLUG_VALID),
  thumbnail: z.string().optional(),
  components: z.any().optional(),
  css: z.any().optional(),
  pagedata: z.any().optional(),
  category: z.array(z.number()).optional(),
  status: z.boolean().optional(),
});

export const detailBlogValidation = z.object({
  blog_id: z.string()
    .min(1, ValidationMessages.BLOG_ID_REQUIRED)
    .regex(/^\d+$/, ValidationMessages.BLOG_ID_POSITIVE_INT)
    .transform(val => parseInt(val)),
});

export const updateBlogValidation = z.object({
  title: z.string()
    .min(1, ValidationMessages.TITLE_REQUIRED)
    .max(500, ValidationMessages.TITLE_MAX_LENGTH)
    .optional(),
  description: z.string().optional(),
  slug: z.string()
    .min(1, ValidationMessages.SLUG_REQUIRED)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, ValidationMessages.SLUG_VALID)
    .optional(),
  thumbnail: z.string().optional(),
  components: z.any().optional(),
  css: z.any().optional(),
  pagedata: z.any().optional(),
  category: z.array(z.number()).optional()
});

export const statusBlogValidation = z.object({
  status: z.boolean(ValidationMessages.STATUS_BOOLEAN),
});

export const slugBlogValidation = z.object({
  slug: z.string()
    .min(1, ValidationMessages.SLUG_REQUIRED)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, ValidationMessages.SLUG_VALID),
});

export const detailBySlugValidation = z.object({
  slug: z.string().min(1, ValidationMessages.SLUG_REQUIRED),
});

export const blogIdsValidation = z.object({
  ids: z.array(z.number().positive(ValidationMessages.IDS_EACH_POSITIVE_INT))
    .min(1, ValidationMessages.IDS_NON_EMPTY_ARRAY),
});

export const deleteBlogsValidation = z.object({
  ids: z.array(z.number().positive(ValidationMessages.IDS_EACH_POSITIVE_INT))
    .min(1, ValidationMessages.IDS_NON_EMPTY_ARRAY),
  action: z.enum([common.DELETE_ACTIONS.TEMPORARY, common.DELETE_ACTIONS.PERMANENT, common.DELETE_ACTIONS.RESTORE]),
});

// Comment-related Zod schemas (keeping original method names)
export const createCommentValidation = z.object({
  blog_id: z.number()
    .positive(ValidationMessages.BLOG_ID_POSITIVE_INT),
  user_id: z.number()
    .positive(ValidationMessages.USER_ID_POSITIVE_INT)
    .optional(),
  comment: z.string()
    .min(1, ValidationMessages.COMMENT_REQUIRED),
  website_url: z.string()
    .url(ValidationMessages.WEBSITE_URL_VALID)
    .optional(),
});

export const updateCommentStatusValidation = z.object({
  ids: z.array(z.number().positive(ValidationMessages.IDS_EACH_POSITIVE_INT))
    .min(1, ValidationMessages.IDS_NON_EMPTY_ARRAY),
  status: z.boolean(ValidationMessages.STATUS_BOOLEAN),
});

export const deleteCommentsValidation = z.object({
  ids: z.array(z.number().positive(ValidationMessages.IDS_EACH_POSITIVE_INT))
    .min(1, ValidationMessages.IDS_NON_EMPTY_ARRAY),
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

