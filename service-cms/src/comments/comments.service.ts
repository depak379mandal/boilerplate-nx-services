import {
  AppDataSource,
  Category,
  BlogCategory,
  BlogComment,
  User,
} from '@./shared-db';
import { Not, In } from 'typeorm';
import { DELETE_ACTIONS } from '../common/constants';
import { BlogOptions, BlogComments } from '../blogs/blogs.types';
import { Brackets } from 'typeorm';

const categoryRepository = AppDataSource.getRepository(Category);
const blogCategoryRepo = AppDataSource.getRepository(BlogCategory);
const blogCommentRepository = AppDataSource.getRepository(BlogComment);
/**
 * Create a blog comment
 */
export const createComment = async (data: BlogComments) => {
  try {
    const { blog_id, user_id, comment, website_url, status } = data;

    const blogComment = blogCommentRepository.create({
      blog: { id: blog_id },
      user: user_id ? { id: user_id } : undefined,
      comment,
      websiteUrl: website_url,
      status,
    });

    return await blogCommentRepository.save(blogComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

/**
 * List blog comments with filters and pagination
 */
export const listComment = async (options: BlogOptions, blogId: number) => {
  try {
    const { limit, skip, sortingDirection, sortingKey, searchTerm } = options;

    const queryBuilder = blogCommentRepository
      .createQueryBuilder('bc')
      .leftJoin(User, 'u', 'u.id = bc.user_id')
      .select([
        'bc.id AS id',
        'bc.comment AS comment',
        `CASE WHEN bc.status THEN 'Active' ELSE 'Inactive' END AS status`,
        'u.name AS user',
      ])
      .where('bc.blog_id = :blogId', { blogId });

    if (searchTerm && searchTerm.trim()) {
      queryBuilder.andWhere(
        `(bc.comment ILIKE :term OR u.name ILIKE :term OR ` +
          `CASE WHEN bc.status THEN 'Active' ELSE 'Inactive' END ILIKE :term)`,
        { term: `%${searchTerm}%` }
      );
    }

    // Get total count first
    const countQuery = blogCommentRepository
      .createQueryBuilder('bc')
      .leftJoin(User, 'u', 'u.id = bc.user_id')
      .where('bc.blog_id = :blogId', { blogId });

    if (searchTerm && searchTerm.trim()) {
      countQuery.andWhere(
        `(bc.comment ILIKE :term OR u.name ILIKE :term OR ` +
          `CASE WHEN bc.status THEN 'Active' ELSE 'Inactive' END ILIKE :term)`,
        { term: `%${searchTerm}%` }
      );
    }

    const total = await countQuery.getCount();

    // Apply ordering and pagination
    queryBuilder
      .orderBy(
        `bc.${sortingKey}`,
        sortingDirection.toUpperCase() as 'ASC' | 'DESC'
      )
      .skip(skip)
      .take(limit);

    const rawResults = await queryBuilder.getRawMany();

    return { blogComments: rawResults, total };
  } catch (error) {
    console.error('Error listing comments:', error);
    throw error;
  }
};

/**
 * Update comment status in bulk
 */
export const updateCommentStatus = async (ids: number[], status: boolean) => {
  try {
    return await blogCommentRepository.update(
      { id: In(ids) as any },
      { status }
    );
  } catch (error) {
    console.error('Error updating comment status:', error);
    throw error;
  }
};

/**
 * Check if comments exist
 */
export const checkCommentsExist = async (commentIds: number[]) => {
  try {
    return await blogCommentRepository.find({
      where: {
        id: In(commentIds) as any,
      },
      select: ['id'],
    });
  } catch (error) {
    console.error('Error checking if comments exist:', error);
    throw error;
  }
};

/**
 * Delete comments in bulk
 */
export const deleteComments = async (ids: number[]) => {
  try {
    return await blogCommentRepository.delete({ id: In(ids) as any });
  } catch (error) {
    console.error('Error deleting comments:', error);
    throw error;
  }
};
