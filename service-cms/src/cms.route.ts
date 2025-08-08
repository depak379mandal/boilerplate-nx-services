import { Router } from 'express';
import { validationMiddleware } from '@./shared-utils';
import { 
  getBlogsSchema, 
  createBlogCategorySchema, 
  listBlogCategorySchema,
  detailBlogCategorySchema,
  detailBySlugSchema,
  updateSlugSchema,
  updateStatusSchema,
  updateBlogCategorySchema,
  deleteBlogCategorySchema
} from './schemas/blogsCategory.schema';
import { createBlogValidation, updateBlogValidation, statusBlogValidation, slugBlogValidation, detailBySlugValidation, blogIdsValidation, createCommentValidation, updateCommentStatusValidation, deleteCommentsValidation, deleteBlogsValidation, listBlogsValidation, listCommentsValidation, detailBlogValidation } from './schemas/blogs.schema';
import { createBlog, getBlogs, addBlog, listBlogs, getSingleBlog, getBlogBySlug, updateBlog, removeBlogs, updateBlogSlug, updateBlogStatus, addComment, listComment, removeComments, updateCommentStatus } from './blogs/blogs.controller';
import { addBlogCategory, listBlogCategorys, getSingleBlogCategory, getBlogCategoryBySlug, updateSlug, updateStatus, updateBlogCategory, removeBlogCategory } from './blogsCategory/blogsCategory.controller';
const router = Router();

router.post('/cms/create-blog', validationMiddleware(createBlogValidation), createBlog);
//router.get('/cms/get-blogs', validationMiddleware(listBlogsValidation, 'query'), getBlogs);
//Blogs Routes
router.post('/cms/blog/create', validationMiddleware(createBlogValidation), addBlog);
router.get('/cms/blog/list', validationMiddleware(listBlogsValidation, 'query'), listBlogs);
router.get('/cms/blog/detail/:blog_id', validationMiddleware(detailBlogValidation, 'params'), getSingleBlog);
router.get('/cms/blog/by-slug/:slug', validationMiddleware(detailBySlugValidation, 'params'), getBlogBySlug);
router.put('/cms/blog/update-slug/:blog_id',validationMiddleware(slugBlogValidation), updateBlogSlug)
router.put('/cms/blog/update-status/:blog_id',validationMiddleware(statusBlogValidation), updateBlogStatus)
router.put('/cms/blog/update/:blog_id', validationMiddleware(updateBlogValidation), updateBlog);  
router.delete('/cms/blog/delete', validationMiddleware(deleteBlogsValidation), removeBlogs); 

// blog comments routes
router.post('/cms/comment/create', validationMiddleware(createCommentValidation), addComment);
router.get('/cms/comment/list/:blog_id', validationMiddleware(listCommentsValidation, 'query'), listComment);
router.delete('/cms/comment/delete', validationMiddleware(deleteCommentsValidation), removeComments);
router.put('/cms/comment/update-status', validationMiddleware(updateCommentStatusValidation), updateCommentStatus);

//Blog Category
router.post('/cms/blog_category/create-blog-category', validationMiddleware(createBlogCategorySchema), addBlogCategory);
router.get('/cms/blog_category/list', validationMiddleware(listBlogCategorySchema, 'query'), listBlogCategorys);
router.get('/cms/blog_category/detail/:category_id', validationMiddleware(detailBlogCategorySchema, 'params'), getSingleBlogCategory);
router.get('/cms/blog_category/by-slug/:slug', validationMiddleware(detailBySlugSchema, 'params'), getBlogCategoryBySlug);
router.put('/cms/blog_category/update-slug/:category_id', validationMiddleware(updateSlugSchema), updateSlug);
router.put('/cms/blog_category/update-status/:category_id', validationMiddleware(updateStatusSchema), updateStatus);
router.put('/cms/blog_category/update/:category_id', validationMiddleware(updateBlogCategorySchema), updateBlogCategory);  
router.delete('/cms/blog_category/delete', validationMiddleware(deleteBlogCategorySchema), removeBlogCategory); 


export default router;
