import { AppDataSource, Blog, BlogCategory, Category, BlogComment } from '@./shared-db';

import { Blogs, BlogOptions } from './blogs.types';
import { In, Not , Brackets, SelectQueryBuilder} from 'typeorm';
import { DELETE_ACTIONS } from '../common/constants';


const blogRepository = AppDataSource.getRepository(Blog);
const blogCategoryRepository = AppDataSource.getRepository(BlogCategory);
const categoryRepository = AppDataSource.getRepository(Category);
const blogCommentRepository = AppDataSource.getRepository(BlogComment);

export const createBlog = async (data: Blogs) => {
  try {
    const {
      title,
      description,
      slug,
      category,
      components,
      css,
      pagedata,
      thumbnail,
    } = data;

    // 1. Create the blog entry
    const blog = blogRepository.create({
      title,
      description,
      slug: slug.toLowerCase(),
      components,
      css,
      pagedata,
      thumbnail,
    });

    await blogRepository.save(blog);

    // 2. Create blog-category relations
    if (Array.isArray(category)) {
      const blogCategories: BlogCategory[] = [];

      for (const categoryId of category) {
        const categoryEntity = await categoryRepository.findOneBy({
          id: categoryId,
        });
        if (categoryEntity) {
          const blogCategory = blogCategoryRepository.create({
            blog,
            category: categoryEntity,
          });
          blogCategories.push(blogCategory);
        }
      }

      if (blogCategories.length > 0) {
        await blogCategoryRepository.save(blogCategories);
      }
    }

    return {
      id: blog.id,
      title: blog.title,
      description: blog.description,
      slug: blog.slug,
      thumbnail: blog.thumbnail,
      components: blog.components,
      css: blog.css,
      pagedata: blog.pagedata,
      status: blog.status,
      is_deleted: blog.isDeleted,
      created_at: blog.createdAt?.toISOString(),
      updated_at: blog.updatedAt?.toISOString(),
    };
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const blogBySlug = async (slug: string) => {
  try {
    const blog = await blogRepository.findOne({
      where: { slug: slug.toLowerCase() },
    });

    return blog;
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    throw error;
  }
};

export const updateBlog = async (blogId: number, data: Partial<Blog> & { category?: number[] }) => {
    try {
      const {
        title,
        description,
        slug,
        category,
        components,
        css,
        pagedata,
        thumbnail,
      } = data;
  
      // Update blog
      const blog = await blogRepository.save({
        id: blogId,
        title,
        description,
        slug: slug.toLowerCase(),
        components,
        css,
        pagedata,
        thumbnail,
      });
  
      // Update categories if provided
      if (Array.isArray(category)) {
        // Delete existing blog-category mappings
        await blogCategoryRepository.delete({
          blog: { id: blogId }
        });
  
        // Create new mappings
        const blogCategoriesData = category.map((categoryId: number) =>
          blogCategoryRepository.create({
            blog: { id: blogId },
            category: { id: categoryId },
          })
        );
  
        if (blogCategoriesData.length > 0) {
          await blogCategoryRepository.save(blogCategoriesData);
        }
      }
  
      return blog;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  };

export const updateSlug = async (blogId: number, slug: string) => {
  try {
    const blogRepo = AppDataSource.getRepository(Blog);
    return await blogRepo.save({ id: blogId, slug: slug.toLowerCase() });
  } catch (error) {
    console.error('Error updating slug:', error);
    throw error;
  }
};

export const updateStatus = async (blogId: number, status: boolean) => {
  try {
    const blogRepo = AppDataSource.getRepository(Blog);
    return await blogRepo.save({ id: blogId, status });
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

export const detailBlog = async (blogId: number) => {
    try {
      // Fetch the blog
      const blog = await blogRepository.findOne({
        where: { id: blogId }
      });
  
      if (!blog) return null;
  
      // Fetch blog-category relations with category details
      const blogCategories = await blogCategoryRepository.find({
        where: { blog: { id: blogId } },
        relations: ['category'],
      });
  
      // Map the categories
      const category = blogCategories.map((item) => ({
        id: item.category.id,
        title: item.category.title,
        slug: item.category.slug,
      }));
  
      // Return combined result
      return {
        ...blog,
        category,
      };
    } catch (error) {
      console.error('Error fetching blog detail:', error);
      throw error;
    }
  };

export const checkSlugExcludeId = async (blogId: number, slug: string) => {
  try {
    return await blogRepository.findOne({
      where: { slug: slug.toLowerCase(), id: Not(blogId) as any },
    });
  } catch (error) {
    console.error('Error checking slug:', error);
    throw error;
  }
};

export const getBlogById = async (blogId: number) => {
  try {
    return await blogRepository.findOneBy({ id: blogId });
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    throw error;
  }
};

export const checkBlogsExist = async (blogIds: number[]) => {
  try {
    return await blogRepository.find({
      where: {
        id: In(blogIds) as any,
      },
      select: ['id', 'isDeleted'],
    });
  } catch (error) {
    console.error('Error checking if blogs exist:', error);
    throw error;
  }
};

export const deleteBlogs = async (blogIds: number[], action: string) => {
    try {
      const tempAndRestore = [DELETE_ACTIONS.TEMPORARY, DELETE_ACTIONS.RESTORE];
  
      if (action === DELETE_ACTIONS.PERMANENT) {
                // Delete related blog_categories
        await blogCategoryRepository
          .createQueryBuilder()
          .delete()
          .where('blog_id IN (:...ids)', { ids: blogIds })
          .execute();

        // Delete related blog_comments
        await blogCommentRepository
          .createQueryBuilder()
          .delete()
          .where('blog_id IN (:...ids)', { ids: blogIds })
          .execute();
  
        // Delete blogs
        return await blogRepository
          .createQueryBuilder()
          .delete()
          .where('id IN (:...ids)', { ids: blogIds })
          .execute();
      } 
      
      else if (tempAndRestore.includes(action)) {
        const deleteStatus = action === DELETE_ACTIONS.TEMPORARY;
  
        return await blogRepository
          .createQueryBuilder()
          .update(Blog)
          .set({ isDeleted: deleteStatus })
          .where('id IN (:...ids)', { ids: blogIds })
          .execute();
      }
  
      return false;
    } catch (error) {
      console.error('Error deleting blogs:', error);
      throw error;
    }
  };

  export const listBlog = async (options: BlogOptions) => {
    try {
      const {
        limit,
        skip,
        sortingDirection,
        sortingKey,
        searchTerm,
      } = options;
  
      const queryBuilder = blogRepository
        .createQueryBuilder('b')
        .select([
          'b.id',
          'b.title',
          'b.description',
          'b.slug',
          'b.status',
        ])
        .where('b.is_deleted = false');
  
      // Search filter
      if (searchTerm && searchTerm.trim()) {
        queryBuilder.andWhere(
          new Brackets(qb => {
            qb.where('b.title ILIKE :term', { term: `%${searchTerm}%` })
              .orWhere('b.description ILIKE :term', { term: `%${searchTerm}%` })
              .orWhere('b.slug ILIKE :term', { term: `%${searchTerm}%` })
              .orWhere(`CAST(CASE WHEN b.status THEN 'Active' ELSE 'Inactive' END AS TEXT) ILIKE :term`, {
                term: `%${searchTerm}%`,
              });
          })
        );
      }
  
      // Order, Pagination
      queryBuilder
        .orderBy(`b.${sortingKey}`, sortingDirection.toUpperCase() as 'ASC' | 'DESC')
        .skip(skip)
        .take(limit);
  
      // Execute
      const [blogs, total] = await queryBuilder.getManyAndCount();
  
      // Transform status (if needed)
      const transformedBlogs = blogs.map(blog => ({
        ...blog,
        status: blog.status ? 'Active' : 'Inactive',
      }));
  
      return { blogs: transformedBlogs, total };
    } catch (error) {
      console.error('Error listing blogs:', error);
      throw error;
    }
  };
