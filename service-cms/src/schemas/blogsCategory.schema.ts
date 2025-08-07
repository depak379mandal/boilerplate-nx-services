import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import * as common from '../common/constants';
import { ValidationMessages } from '../common/message';

extendZodWithOpenApi(z);

export const getBlogsSchema = z.object({
  blog_id: z
    .string(ValidationMessages.BLOG_ID_REQUIRED)
    .min(1, { message: ValidationMessages.BLOG_ID_REQUIRED })
    .optional(),
});

export const createBlogCategorySchema = z.object({
  title: z
    .string(ValidationMessages.TITLE_REQUIRED)
    .min(1, { message: ValidationMessages.TITLE_STRING })
    .max(255, { message: ValidationMessages.TITLE_MAX_LENGTH }),
  description: z
    .string(ValidationMessages.DESCRIPTION_STRING)
    .min(1, { message: ValidationMessages.DESCRIPTION_STRING })
    .max(500, { message: ValidationMessages.DESCRIPTION_STRING }),
  slug: z
    .string(ValidationMessages.SLUG_REQUIRED)
    .min(1, { message: ValidationMessages.SLUG_REQUIRED })
    .max(45, { message: ValidationMessages.SLUG_VALID }),
});

export const updateBlogCategorySchema = z.object({
  title: z
    .string(ValidationMessages.TITLE_REQUIRED)
    .min(1, { message: ValidationMessages.TITLE_STRING })
    .max(255, { message: ValidationMessages.TITLE_MAX_LENGTH }),
  description: z
    .string(ValidationMessages.DESCRIPTION_STRING)
    .min(1, { message: ValidationMessages.DESCRIPTION_STRING })
    .max(500, { message: ValidationMessages.DESCRIPTION_STRING }),
  slug: z
    .string(ValidationMessages.SLUG_REQUIRED)
    .min(1, { message: ValidationMessages.SLUG_REQUIRED })
    .max(45, { message: ValidationMessages.SLUG_VALID }),
});

export const updateSlugSchema = z.object({
  slug: z
    .string(ValidationMessages.SLUG_REQUIRED)
    .min(1, { message: ValidationMessages.SLUG_REQUIRED })
    .max(45, { message: ValidationMessages.SLUG_VALID }),
});

export const updateStatusSchema = z.object({
  status: z
    .boolean(ValidationMessages.STATUS_BOOLEAN)
    .refine((val) => val !== undefined, { message: ValidationMessages.STATUS_REQUIRED }),
});

export const deleteBlogCategorySchema = z.object({
  ids: z
    .array(z.number(ValidationMessages.IDS_EACH_POSITIVE_INT))
    .min(1, { message: ValidationMessages.IDS_NON_EMPTY_ARRAY }),
  action: z
    .string(ValidationMessages.TYPE_REQUIRED)
    .min(1, { message: ValidationMessages.TYPE_REQUIRED }),
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
    .string(ValidationMessages.ID_REQUIRED)
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: ValidationMessages.ID_POSITIVE_INT,
    }),
});

export const detailBySlugSchema = z.object({
  slug: z
    .string(ValidationMessages.SLUG_REQUIRED)
    .min(1, { message: ValidationMessages.SLUG_REQUIRED }),
});