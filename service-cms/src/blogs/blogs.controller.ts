import { AppDataSource, User, Category } from '@./shared-db';
import { CreatedResponse, OkResponse, ErrorResponse, NotFoundResponse, paginateQuery, paginateResponse} from '@./shared-utils';
import { Request, Response } from 'express';
import { registerSchema, getBlogsSchema } from '../schemas/blogs.schema';
import { z } from 'zod';
import { SuccessMessages, ErrorMessages } from '../common/message';
import * as service from './blogs.service';
import { In } from 'typeorm';
import * as common from '../common/constants';

const userRepository = AppDataSource.getRepository(User);
const categoryRepository = AppDataSource.getRepository(Category);

export const createBlog = async (req: Request, res: Response) => {
  const { name } = req.body as z.infer<typeof registerSchema>;
  console.log('name', name);
  const user = await userRepository.save({
    name,
  });
  return OkResponse(
    {
      message: SuccessMessages.BLOG_ADDED_SUCCESSFULLY,
      data: user,
      statusCode: 200,
    },
    res
  );
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const parsedQuery = getBlogsSchema.parse(req.query);
    console.log('Validated query: ', parsedQuery);

    const dummyData = [
      {
        id: 1,
        title: 'Blog 1',
        description: 'Blog 1 description',
      },
    ];
    console.log('dummyData query: ', dummyData);
    return OkResponse(
      {
        message: SuccessMessages.BLOG_FETCHED,
        data: dummyData,
        statusCode: 200,
      },
      res
    );
  } catch (err) {
    console.error('Validation error:', err);
    return res.status(400).json({
      message: 'Validation error',
      data: (err as any).flatten ? (err as any).flatten().fieldErrors : err,
    });
  }
};

export const addBlog = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      slug,
      category,
      components,
      css,
      pagedata,
      status,
      thumbnail,
    } = req.body;

    const blog = await service.blogBySlug(slug);
    if (blog) {
      return NotFoundResponse(
        { message: SuccessMessages.BLOG_SLUG },
        res
      );
    }

    // Verify category IDs
    if (Array.isArray(category) && category.length >= 1) {
      const validCategories = await categoryRepository
        .createQueryBuilder('category')
        .select('category.id')
        .where('category.id IN (:...ids)', { ids: category })
        .getMany();

      if (validCategories.length !== category.length) {
        return NotFoundResponse(
          { message: SuccessMessages.CATEGORY_ID_INVALID },
          res
        );
      }
    }

    const blogData = {
      title,
      description,
      slug,
      category,
      components,
      css,
      pagedata,
      status,
      thumbnail,
    };

    const result = await service.createBlog(blogData);

    return OkResponse(
      {
        message: SuccessMessages.BLOG_ADDED_SUCCESSFULLY,
        data: result,
        statusCode: 200,
      },
      res
    );

  } catch (error: any) {
    console.log(error);
    return ErrorResponse(
      { message: ErrorMessages.INTERNAL_SERVER_ERROR },
      res
    );
  }
};


export const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);

    const blog = await service.detailBlog(blogId);

    if (!blog) {
      return NotFoundResponse(
        { message: SuccessMessages.BLOG_NOT_FOUND },
        res
      );
    }

    return OkResponse(
      {
        message: SuccessMessages.BLOG_FETCHED,
        data: blog,
        statusCode: 200,
      },
      res
    );
  } catch (error: any) {
    console.log(error);
    return ErrorResponse(
      { message: ErrorMessages.INTERNAL_SERVER_ERROR },
      res
    );
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    const blog = await service.blogBySlug(slug);

    if (!blog) {
      return NotFoundResponse(
        { message: SuccessMessages.BLOG_NOT_FOUND },
        res
      );
    }

    return OkResponse(
      {
        message: SuccessMessages.BLOG_FETCHED,
        data: blog,
        statusCode: 200,
      },
      res
    );
  } catch (error: any) {
    console.log(error);
    return ErrorResponse(
      { message: ErrorMessages.INTERNAL_SERVER_ERROR },
      res
    );
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);

    const blogDetail = await service.detailBlog(blogId);

    if (!blogDetail) {
      return NotFoundResponse(
        { message: SuccessMessages.BLOG_NOT_FOUND },
        res
      );
    }

    const { title, description, slug, category, components, css, pagedata, status, userId, thumbnail } = req.body;

    const blog = await service.checkSlugExcludeId(blogId, slug);
    
    if (blog) {
      return ErrorResponse(
        { message: SuccessMessages.BLOG_SLUG },
        res
      );
    }

    // Verify category IDs
    if (Array.isArray(category) && category.length >= 1) {
      const validCategories = await categoryRepository
        .createQueryBuilder('category')
        .select('category.id')
        .where('category.id IN (:...ids)', { ids: category })
        .getMany();
      
      if (validCategories.length !== category.length) {
        return ErrorResponse(
          { message: SuccessMessages.CATEGORY_ID_INVALID },
          res
        );
      }
    }

    const blogData = { title, description, slug, category, components, css, pagedata, status, userId, thumbnail };

    const result = await service.updateBlog(blogId, blogData);

    return OkResponse(
      {
        message: SuccessMessages.BLOG_UPDATED,
        data: result,
        statusCode: 200,
      },
      res
    );
  } catch (error: any) {
    console.log(error);
    return ErrorResponse(
      { message: ErrorMessages.INTERNAL_SERVER_ERROR },
      res
    );
  }
};

export const removeBlogs = async (req: Request, res: Response) => {
  try {
    const { ids: blogIds, action } = req.body;

    // Check if blogs exist and their current deletion status
    const existingBlogs = await service.checkBlogsExist(blogIds);
    const existingIds = existingBlogs.map(blog => blog.id);
    const nonExistingIds = blogIds.filter(id => !existingIds.includes(id));

    if (nonExistingIds.length > 0) {
      return NotFoundResponse(
        { message: `Blog IDs ${nonExistingIds.join(', ')} do not exist` },
        res
      );
    }

    // Check if blogs are already deleted when trying to delete
    if (action === common.DELETE_ACTIONS.TEMPORARY || action === common.DELETE_ACTIONS.PERMANENT) {
      const alreadyDeletedBlogs = existingBlogs.filter(blog => blog.isDeleted);
      if (alreadyDeletedBlogs.length > 0) {
        const deletedIds = alreadyDeletedBlogs.map(blog => blog.id);
        return ErrorResponse(
          { message: `Blog IDs ${deletedIds.join(', ')} are already deleted` },
          res
        );
      }
    }

    // Check if blogs are not deleted when trying to restore
    if (action === common.DELETE_ACTIONS.RESTORE) {
      const notDeletedBlogs = existingBlogs.filter(blog => !blog.isDeleted);
      if (notDeletedBlogs.length > 0) {
        const notDeletedIds = notDeletedBlogs.map(blog => blog.id);
        return ErrorResponse(
          { message: `Blog IDs ${notDeletedIds.join(', ')} are not deleted` },
          res
        );
      }
    }

    await service.deleteBlogs(blogIds, action);

    return OkResponse(
      {
        message: SuccessMessages.BLOG_DELETED_SUCCESSFULLY,
        data: {},
        statusCode: 200,
      },
      res
    );
  } catch (error: any) {
    console.log(error);
    return ErrorResponse(
      { message: ErrorMessages.INTERNAL_SERVER_ERROR },
      res
    );
  }
};

export const updateBlogSlug = async (req: Request, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);
    const { slug } = req.body;

    const blogDetail = await service.detailBlog(blogId);

    if (!blogDetail) {
      return NotFoundResponse(
        { message: SuccessMessages.BLOG_NOT_FOUND },
        res
      );
    }

    const blog = await service.checkSlugExcludeId(blogId, slug);

    if (blog) {
      return ErrorResponse(
        { message: SuccessMessages.BLOG_SLUG },
        res
      );
    }

    await service.updateSlug(blogId, slug);

    return OkResponse(
      {
        message: SuccessMessages.BLOG_UPDATED_SUCCESSFULLY,
        data: {},
        statusCode: 200,
      },
      res
    );
  } catch (error: any) {
    console.log(error);
    return ErrorResponse(
      { message: ErrorMessages.INTERNAL_SERVER_ERROR },
      res
    );
  }
};

export const updateBlogStatus = async (req: Request, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);
    const { status } = req.body;

    const blog = await service.detailBlog(blogId);

    if (!blog) {
      return NotFoundResponse(
        { message: SuccessMessages.BLOG_NOT_FOUND },
        res
      );
    }

    await service.updateStatus(blogId, status);

    return OkResponse(
      {
        message: SuccessMessages.BLOG_UPDATED_SUCCESSFULLY,
        data: {},
        statusCode: 200,
      },
      res
    );
  } catch (error: any) {
    console.log(error);
    return ErrorResponse(
      { message: ErrorMessages.INTERNAL_SERVER_ERROR },
      res
    );
  }
};

export const listBlogs = async (req: Request, res: Response) => {
  try {
    const {
      page,
      limit,
      skip,
      sortingDirection,
      sortingKey,
      filterType,
      filterValue
    } = paginateQuery(req.query, 
      {
        filterKeys: ['title', 'description', 'slug', 'category', 'components', 'css', 'pagedata', 'status', 'thumbnail'],
        sortingKeys: ['title', 'description', 'slug', 'category', 'components', 'css', 'pagedata', 'status', 'thumbnail'],
        defaultSortingKey: 'id',
      }
    );

    const { searchTerm } = req.query as { searchTerm?: string };

    const { blogs, total } = await service.listBlog({
      page,
      limit,
      skip,
      sortingDirection,
      sortingKey,
      filterType,
      filterValue,
      searchTerm
    });

    const paginatedResult = paginateResponse({ data: blogs, limit, page, total });

    return OkResponse(
      {
        message: SuccessMessages.BLOG_FETCHED,
        data: paginatedResult,
        statusCode: 200,
      },
      res
    );
  } catch (error: any) {
    console.log(error);
    return ErrorResponse(
      { message: ErrorMessages.INTERNAL_SERVER_ERROR },
      res
    );
  }
};

// export const addComment = async (req: Request, res: Response) => {
//   try {
//     const { blogId, comment, websiteUrl } = req.body;

//     const userId = req.userId;
//     console.log('userId :- ', userId);

//     if (typeof userId !== 'number') {
//       return ErrorResponse(
//         { message: "Invalid blogId or userId" },
//         res
//       );
//     }

//     const blog = await service.getBlogById(blogId);

//     if (!blog) {
//       return NotFoundResponse(
//         { message: SuccessMessages.BLOG_NOT_FOUND },
//         res
//       );
//     }

//     const result = await commentService.createComment({ blogId, userId, comment, websiteUrl });

//     return OkResponse(
//       {
//         message: SuccessMessages.COMMENT_ADDED_SUCCESSFULLY,
//         data: result,
//         statusCode: 201,
//       },
//       res
//     );
//   } catch (error: any) {
//     console.log(error);
//     return ErrorResponse(
//       { message: ErrorMessages.INTERNAL_SERVER_ERROR },
//       res
//     );
//   }
// };

// export const listComment = async (req: Request, res: Response) => {
//   try {
//     const {
//       page,
//       limit,
//       skip,
//       sortingDirection,
//       sortingKey,
//       filterType,
//       filterValue
//     } = paginateQuery(req.query, 
//       {
//         filterKeys: ['comment', 'status', 'user'],
//         sortingKeys: ['comment', 'status', 'user'],
//         defaultSortingKey: 'id',
//       }
//     );

//     const { searchTerm } = req.query as { searchTerm?: string };

//     const blogId = parseInt(req.params.id);

//     const { blogComments, total } = await commentService.listComment({
//       page,
//       limit,
//       skip,
//       sortingDirection,
//       sortingKey,
//       filterType,
//       filterValue,
//       searchTerm
//     }, blogId);

//     const paginatedResult = paginateResponse({ data: blogComments, limit, page, total });

//     return OkResponse(
//       {
//         message: SuccessMessages.COMMENT_FETCHED,
//         data: paginatedResult,
//         statusCode: 200,
//       },
//       res
//     );
//   } catch (error: any) {
//     console.log(error);
//     return ErrorResponse(
//       { message: ErrorMessages.INTERNAL_SERVER_ERROR },
//       res
//     );
//   }
// };

// export const updateCommentStatus = async (req: Request, res: Response) => {
//   try {
//     const { ids: commentIds, status } = req.body;

//     await commentService.updateCommentStatus(commentIds, status);

//     return OkResponse(
//       {
//         message: SuccessMessages.STATUS_UPDATED_SUCCESSFULLY,
//         data: {},
//         statusCode: 200,
//       },
//       res
//     );
//   } catch (error: any) {
//     console.log(error);
//     return ErrorResponse(
//       { message: ErrorMessages.INTERNAL_SERVER_ERROR },
//       res
//     );
//   }
// };

// export const removeComments = async (req: Request, res: Response) => {
//   try {
//     const commentIds = req.body.ids;

//     await commentService.deleteComments(commentIds);

//     return OkResponse(
//       {
//         message: SuccessMessages.COMMENT_DELETED_SUCCESSFULLY,
//         data: {},
//         statusCode: 200,
//       },
//       res
//     );
//   } catch (error: any) {
//     console.log(error);
//     return ErrorResponse(
//       { message: ErrorMessages.INTERNAL_SERVER_ERROR },
//       res
//     );
//   }
// };
