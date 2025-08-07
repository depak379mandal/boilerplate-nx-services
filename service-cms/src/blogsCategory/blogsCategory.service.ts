import { AppDataSource, Category, BlogCategory } from '@./shared-db';
import { Not, In } from 'typeorm';
import { DELETE_ACTIONS } from '../common/constants';
import { BlogCategoryOptions } from './blogsCategory.types';
import { Brackets } from 'typeorm';

const categoryRepository = AppDataSource.getRepository(Category);
const blogCategoryRepo = AppDataSource.getRepository(BlogCategory);

export const createBlogCategory = async (data: Partial<Category>) => {
  try {
    const { title, description, slug } = data;

    const category = categoryRepository.create({
      title,
      description,
      slug: slug.toLowerCase(),
    });

    await categoryRepository.save(category);

    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const blogCategoryBySlug = async (slug: string) => {
  try {
    const category = await categoryRepository.findOne({
      where: {
        slug: slug.toLowerCase(),
      },
    });

    return category;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    throw error;
  }
};




export const updateBlogCategory = async (categoryId: number, data: Partial<Category>) => {
  try {
    const { title, description, slug } = data;
    const category = await categoryRepository.findOneByOrFail({ id: categoryId });
    category.title = title;
    category.description = description;
    category.slug = slug.toLowerCase();
    return await categoryRepository.save(category);
  } catch (error) {
    console.error("Error updating blog category:", error);
    throw error;
  }
};

export const updateSlug = async (categoryId: number, slug: string) => {
  try {
    const category = await categoryRepository.findOneByOrFail({ id: categoryId });
    category.slug = slug.toLowerCase();
    return await categoryRepository.save(category);
  } catch (error) {
    console.error("Error updating slug:", error);
    throw error;
  }
};

export const updateStatus = async (categoryId: number, status: boolean) => {
  try {
    const category = await categoryRepository.findOneByOrFail({ id: categoryId });
    category.status = status;
    return await categoryRepository.save(category);
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const detailBlogCategory = async (categoryId: number) => {
  try {
    return await categoryRepository.findOneBy({ id: categoryId });
  } catch (error) {
    console.error("Error fetching blog category detail:", error);
    throw error;
  }
};

export const checkSlugExcludeId = async (categoryId: number, slug: string) => {
  try {
    return await categoryRepository.findOne({
      where: {
        slug: slug.toLowerCase(),
        id: Not(categoryId) as any,
      },
    });
  } catch (error) {
    console.error("Error checking slug exclude id:", error);
    throw error;
  }
};

export const deleteBlogCategory = async (categoryIds: number[], action: string) => {
  try {
    if (action === DELETE_ACTIONS.PERMANENT) {
      return await categoryRepository.delete(categoryIds);
    } else if ([DELETE_ACTIONS.TEMPORARY, DELETE_ACTIONS.RESTORE].includes(action)) {
      const isDeleted = action === DELETE_ACTIONS.TEMPORARY;
      return await categoryRepository.update({ id: In(categoryIds) as any }, { isDeleted });
    }
    return false;
  } catch (error) {
    console.error("Error deleting blog category:", error);
    throw error;
  }
};

export const listBlogCategory1 = async (options: BlogCategoryOptions) => {
  try {
    const {
      page, limit, skip, sortingDirection, sortingKey,
      searchTerm
    } = options;

    const query = categoryRepository.createQueryBuilder('c')
      .select([
        'c.id AS id',
        'c.title AS title',
        'c.description AS description',
        'c.slug AS slug',
        `CASE WHEN c.status THEN 'Active' ELSE 'Inactive' END AS status`
      ])
      .where('c.is_deleted = false')
      .orderBy(`c.${sortingKey}`, sortingDirection.toUpperCase() as 'ASC' | 'DESC')
      .skip(skip)
      .take(limit);

    if (searchTerm) {
      query.andWhere(
        `(c.title ILIKE :term OR c.description ILIKE :term OR c.slug ILIKE :term OR ` +
        `CASE WHEN c.status THEN 'Active' ELSE 'Inactive' END ILIKE :term)`,
        { term: `%${searchTerm}%` }
      );
    }

    const result = await query.getRawAndEntities();
    const category = result.entities;
    const total = result.raw.length;

    return { category, total };
  } catch (error) {
    console.error("Error listing blog categories:", error);
    throw error;
  }
};

export const listBlogCategory = async (options: BlogCategoryOptions) => {
  try {
    const {
      page,
      limit,
      skip,
      sortingDirection,
      sortingKey,
      filterType,
      filterValue,
      searchTerm
    } = options;

    const attributeMapping: Record<string, { field: string; alias: string }> = {
      id: { field: 'c.id', alias: 'id' },
      title: { field: 'c.title', alias: 'title' },
      description: { field: 'c.description', alias: 'description' },
      slug: { field: 'c.slug', alias: 'slug' },
      status: { field: `CASE WHEN c.status THEN 'Active' ELSE 'Inactive' END`, alias: 'status' },
    };

    const fields = Object.values(attributeMapping)
      .map(({ field, alias }) => `${field} AS "${alias}"`)
      .join(', ');

    const query = categoryRepository
      .createQueryBuilder('c')
      .select(fields)
      .where('c.is_deleted = false')
      .orderBy(`c.${sortingKey}`, sortingDirection.toUpperCase() as 'ASC' | 'DESC')
      .skip(skip)
      .take(limit);

    if (searchTerm?.trim()) {
      const likeValue = `%${searchTerm.trim()}%`;

      query.andWhere(
        new Brackets((qb) => {
          ['title', 'description', 'slug'].forEach((field) => {
            qb.orWhere(`c.${field} ILIKE :likeValue`, { likeValue });
          });

          // Raw CASE for status search
          qb.orWhere(`(CASE WHEN c.status THEN 'Active' ELSE 'Inactive' END) ILIKE :likeValue`, {
            likeValue,
          });
        })
      );
    }

    const rawResults = await query.getRawMany();

    const countQuery = categoryRepository
      .createQueryBuilder('c')
      .where('c.is_deleted = false');

    if (searchTerm?.trim()) {
      const likeValue = `%${searchTerm.trim()}%`;

      countQuery.andWhere(
        new Brackets((qb) => {
          ['title', 'description', 'slug'].forEach((field) => {
            qb.orWhere(`c.${field} ILIKE :likeValue`, { likeValue });
          });
          qb.orWhere(`(CASE WHEN c.status THEN 'Active' ELSE 'Inactive' END) ILIKE :likeValue`, {
            likeValue,
          });
        })
      );
    }

    const total = await countQuery.getCount();

    return { category: rawResults, total };
  } catch (error) {
    console.error('Error listing blog categories:', error);
    throw error;
  }
};

export const checkCategoriesExist = async (categoryIds: number[]) => {
  try {
    return await categoryRepository.find({
      where: {
        id: In(categoryIds) as any,
      },
      select: ['id'],
    });
  } catch (error) {
    console.error("Error checking if categories exist:", error);
    throw error;
  }
};

export const blogCategoryCount = async (blogCategoryIds: number[]) => {
  try {
    return await blogCategoryRepo.count({
      where: {
        category: {
          id: In(blogCategoryIds) as any,
        },
      },
    });
  } catch (error) {
    console.error("Error counting blog categories:", error);
    throw error;
  }
};
