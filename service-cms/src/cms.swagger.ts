import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { 
  getBlogsSchema, 
  createBlogCategorySchema,
  updateBlogCategorySchema,
  updateSlugSchema,
  updateStatusSchema,
  deleteBlogCategorySchema,
  listBlogCategorySchema,
  detailBlogCategorySchema,
  detailBySlugSchema
} from './schemas/blogsCategory.schema';

import { 
  registerSchema, 
  createBlogValidation, 
  updateBlogValidation, 
  statusBlogValidation, 
  slugBlogValidation, 
  detailBySlugValidation, 
  blogIdsValidation, 
  createCommentValidation, 
  updateCommentStatusValidation, 
  deleteBlogsValidation, 
  listBlogsValidation, 
  listCommentsValidation,
  detailBlogValidation
} from './schemas/blogs.schema';

const registry = new OpenAPIRegistry();

registry.register('GetBlogsRequest', getBlogsSchema);
registry.register('CreateBlogCategoryRequest', createBlogCategorySchema);
registry.register('UpdateBlogCategoryRequest', updateBlogCategorySchema);
registry.register('UpdateSlugRequest', updateSlugSchema);
registry.register('UpdateStatusRequest', updateStatusSchema);
registry.register('DeleteBlogCategoryRequest', deleteBlogCategorySchema);
registry.register('ListBlogCategoryRequest', listBlogCategorySchema);
registry.register('DetailBlogCategoryRequest', detailBlogCategorySchema);
registry.register('DetailBySlugRequest', detailBySlugSchema);
registry.register('CreateBlogRequest', createBlogValidation);
registry.register('UpdateBlogRequest', updateBlogValidation);
registry.register('StatusBlogRequest', statusBlogValidation);
registry.register('SlugBlogRequest', slugBlogValidation);
registry.register('DetailBySlugRequest', detailBySlugValidation);
registry.register('BlogIdsRequest', blogIdsValidation);

registry.registerPath({
  tags: ['CMS'],
  method: 'get',
  path: '/cms/get-blogs',
  request: {
    query: getBlogsSchema, 
  },
  responses: {
    200: {
      description: 'Blogs fetched successfully',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'post',
  path: '/cms/blog_category/create-blog-category',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createBlogCategorySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Blog category created successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'get',
  path: '/cms/blog_category/list',
  request: {
    query: listBlogCategorySchema,
  },
  responses: {
    200: {
      description: 'Blog categories fetched successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'get',
  path: '/cms/blog_category/detail/{id}',
  request: {
    params: detailBlogCategorySchema,
  },
  responses: {
    200: {
      description: 'Blog category detail fetched successfully',
    },
    404: {
      description: 'Blog category not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'get',
  path: '/cms/blog_category/by-slug/{slug}',
  request: {
    params: detailBySlugSchema,
  },
  responses: {
    200: {
      description: 'Blog category fetched by slug successfully',
    },
    404: {
      description: 'Blog category not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'put',
  path: '/cms/blog_category/update-slug/{id}',
  request: {
    params: z.object({
      id: z.string('ID is required'),
    }),
    body: {
      content: {
        'application/json': {
          schema: updateSlugSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Blog category slug updated successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    404: {
      description: 'Blog category not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'put',
  path: '/cms/blog_category/update-status/{id}',
  request: {
    params: z.object({
      id: z.string('ID is required'),
    }),
    body: {
      content: {
        'application/json': {
          schema: updateStatusSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Blog category status updated successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    404: {
      description: 'Blog category not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'put',
  path: '/cms/blog_category/update/{id}',
  request: {
    params: z.object({
      id: z.string('ID is required'),
    }),
    body: {
      content: {
        'application/json': {
          schema: updateBlogCategorySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Blog category updated successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    404: {
      description: 'Blog category not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'delete',
  path: '/cms/blog_category/delete',
  request: {
    body: {
      content: {
        'application/json': {
          schema: deleteBlogCategorySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Blog category deleted successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

// Blog routes
registry.registerPath({
  tags: ['CMS'],
  method: 'post',
  path: '/cms/blog/create',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createBlogValidation,
          example: {
            title: "Test Blog",
            description: "This is a test blog description",
            slug: "test-blog",
            thumbnail: "FE data",
            components: "FE data",
            css: "FE data",
            pagedata: "FE data",
            category: [5],
            status: true
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Blog created successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'get',
  path: '/cms/blog/list',
  request: {
    query: listBlogsValidation,
  },
  responses: {
    200: {
      description: 'Blogs fetched successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'get',
  path: '/cms/blog/detail/{id}',
  request: {
    params: detailBlogValidation,
  },
  responses: {
    200: {
      description: 'Blog detail fetched successfully',
    },
    404: {
      description: 'Blog not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'get',
  path: '/cms/blog/by-slug/{slug}',
  request: {
    params: detailBySlugValidation,
  },
  responses: {
    200: {
      description: 'Blog fetched by slug successfully',
    },
    404: {
      description: 'Blog not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'put',
  path: '/cms/blog/update-slug/{id}',
  request: {
    params: z.object({
      id: z.string('ID is required'),
    }),
    body: {
      content: {
        'application/json': {
          schema: slugBlogValidation,
          example: {
            slug: "blog-4"
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Blog slug updated successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    404: {
      description: 'Blog not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'put',
  path: '/cms/blog/update-status/{id}',
  request: {
    params: z.object({
      id: z.string('ID is required'),
    }),
    body: {
      content: {
        'application/json': {
          schema: statusBlogValidation,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Blog status updated successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    404: {
      description: 'Blog not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'put',
  path: '/cms/blog/update/{id}',
  request: {
    params: z.object({
      id: z.string('ID is required'),
    }),
    body: {
      content: {
        'application/json': {
          schema: updateBlogValidation,
          example: {
            title: "About Us",
            description: "Sample Description2",
            slug: "about-us22",
            thumbnail: "",
            components: "{}",
            css: "{}",
            pagedata: "{}",
            category: [2, 3]
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Blog updated successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    404: {
      description: 'Blog not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'delete',
  path: '/cms/blog/delete',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            ids: z.array(z.number().positive('Each ID must be a positive integer'))
              .min(1, 'At least one ID is required'),
            action: z.object({
              type: z.string('Action type'),
              enum: z.array(z.string()).default(['delete', 'restore', 'temp-delete']),
              example: z.string('delete')
            })
          }),
          example: {
            ids: [12],
            action: {
              type: "string",
              enum: ["delete", "restore", "temp-delete"],
              example: "delete"
            }
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Blogs deleted successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

// Comment routes
registry.registerPath({
  tags: ['CMS'],
  method: 'post',
  path: '/cms/comment/add',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createCommentValidation,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Comment added successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    404: {
      description: 'Blog not found',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'get',
  path: '/cms/comment/list/{blogId}',
  request: {
    params: z.object({
      blogId: z.string('Blog ID is required'),
    }),
    query: listCommentsValidation,
  },
  responses: {
    200: {
      description: 'Comments fetched successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'put',
  path: '/cms/comment/update-status',
  request: {
    body: {
      content: {
        'application/json': {
          schema: updateCommentStatusValidation,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Comment status updated successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

registry.registerPath({
  tags: ['CMS'],
  method: 'delete',
  path: '/cms/comment/delete',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            ids: z.array(z.number().positive('Each ID must be a positive integer'))
              .min(1, 'At least one ID is required'),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Comments deleted successfully',
    },
    400: {
      description: 'Bad request - validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);
export const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'CMS Service',
    version: '1.0.0',
  },
});
