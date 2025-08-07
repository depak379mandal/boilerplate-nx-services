import { AppDataSource, User, Category } from '@./shared-db';
import { CreatedResponse, OkResponse, ErrorResponse, NotFoundResponse, paginateQuery, paginateResponse} from '@./shared-utils';
import { Request, Response } from 'express';
import { registerSchema, getBlogsSchema } from '../schemas/blogs.schema';
import { z } from 'zod';
import { SuccessMessages, ErrorMessages } from '../common/message';
import * as service from './blogsCategory.service';
import { In } from 'typeorm';

const userRepository = AppDataSource.getRepository(User);
const categoryRepository = AppDataSource.getRepository(Category);


export const addBlogCategory = async (req: Request, res: Response) => {
  try {
    const { title, description, slug } = req.body;

    const blogCategory = await service.blogCategoryBySlug(slug);

    if (blogCategory) {
      return NotFoundResponse(
        { message: SuccessMessages.CATEGORY_SLUG },
        res
      );
    }

    const blogCategoryData = { title, description, slug, status: true }

    const result = await service.createBlogCategory(blogCategoryData);

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


export const getSingleBlogCategory = async (req: Request, res: Response) => {
  try {
    const blogCategoryId = parseInt(req.params.id);

    const blogCategory = await service.detailBlogCategory(blogCategoryId);

    if (!blogCategory) {
      return NotFoundResponse(
        { message: SuccessMessages.CATEGORY_NOT_FOUND },
        res
      );
    }

    return OkResponse(
      {
        message: SuccessMessages.CATEGORY_FETCHED,
        data: blogCategory,
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

export const getBlogCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    const blogCategory = await service.blogCategoryBySlug(slug);

    if (!blogCategory) {
      return NotFoundResponse(
        { message: SuccessMessages.CATEGORY_NOT_FOUND },
        res
      );
    }

    return OkResponse(
      {
        message: SuccessMessages.CATEGORY_FETCHED,
        data: blogCategory,
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

export const updateBlogCategory = async (req: Request, res: Response) => {
  try {
    const blogCategoryId = parseInt(req.params.id);

    const blogCategoryDetail = await service.detailBlogCategory(blogCategoryId);

    if (!blogCategoryDetail) {
      return NotFoundResponse(
        { message: SuccessMessages.CATEGORY_NOT_FOUND },
        res
      );
    }

    const { title, description, slug, category, status, userId} = req.body;

    const blogCategory = await service.checkSlugExcludeId(blogCategoryId,slug);
    
    if (blogCategory) {
      return NotFoundResponse(
        { message: SuccessMessages.CATEGORY_SLUG },
        res
      );
    }

    const blogCategoryData = { title, description, slug, category, status, userId}

    const result = await service.updateBlogCategory(blogCategoryId,blogCategoryData);

    return OkResponse(
      {
        message: SuccessMessages.CATEGORY_UPDATED,
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

export const removeBlogCategory = async (req: Request, res: Response) => {
  try {
    const { ids:blogCategoryIds, action }= req.body

    // Check if all category IDs exist in the table
    const existingCategories = await service.checkCategoriesExist(blogCategoryIds);
    const existingIds = existingCategories.map(cat => cat.id);
    const nonExistingIds = blogCategoryIds.filter(id => !existingIds.includes(id));

    if (nonExistingIds.length > 0) {
      return NotFoundResponse(
        { message: `Category IDs ${nonExistingIds.join(', ')} do not exist` },
        res
      );
    }

    const blogCategory = await service.blogCategoryCount(blogCategoryIds);

    if(blogCategory >= 1) {
      return NotFoundResponse(
        { message: SuccessMessages.CATEGORY_ASSOCIATED_WITH_BLOG },
        res
      );
    }

    await service.deleteBlogCategory(blogCategoryIds, action);

    return OkResponse(
      {
        message: SuccessMessages.CATEGORY_DELETED_SUCCESSFULLY,
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

export const updateSlug = async (req: Request, res: Response) => {
  try {
    const blogCategoryId = parseInt(req.params.id);
    const { slug } = req.body

    const blogCategoryDetail = await service.detailBlogCategory(blogCategoryId);

    if (!blogCategoryDetail) {
      return NotFoundResponse(
        { message: SuccessMessages.CATEGORY_NOT_FOUND },
        res
      );
    }

    const blogCategory = await service.checkSlugExcludeId(blogCategoryId,slug);

    if (blogCategory) {
      return NotFoundResponse(
        { message: SuccessMessages.CATEGORY_SLUG },
        res
      );
    }

    await service.updateSlug(blogCategoryId, slug);

    return OkResponse(
      {
        message: SuccessMessages.CATEGORY_UPDATED_SUCCESSFULLY,
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

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const blogCategoryId = parseInt(req.params.id);
    const { status } = req.body

    const blogCategory = await service.detailBlogCategory(blogCategoryId);

    if (!blogCategory) {
      return NotFoundResponse(
        { message: SuccessMessages.CATEGORY_NOT_FOUND },
        res
      );
    }

    await service.updateStatus(blogCategoryId, status);

    return OkResponse(
      {
        message: SuccessMessages.CATEGORY_UPDATED_SUCCESSFULLY,
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

export const listBlogCategorys = async (req: Request, res: Response) => {
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
        filterKeys: ['title', 'description', 'slug', 'status',],
        sortingKeys: ['title', 'description', 'slug', 'status',],
        defaultSortingKey: 'id',
      }
    );

    const { searchTerm } = req.query as { searchTerm?: string };

    const {category,total} = await service.listBlogCategory({
      page,
      limit,
      skip,
      sortingDirection,
      sortingKey,
      filterType,
      filterValue,
      searchTerm
    });

    const paginatedResult = paginateResponse({ data: category, limit, page, total });

    return OkResponse(
      {
        message: SuccessMessages.CATEGORY_FETCHED,
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