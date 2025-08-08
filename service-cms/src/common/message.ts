export enum SuccessMessages {
  DASHBOARD_SUCCESS = 'Dashboard data fetched successfully.',
  BLOG_ADDED_SUCCESSFULLY = 'Blog added successfully',
  BLOG_NOT_FOUND = 'Blog not found',
  BLOG_FETCHED = 'Blogs fetched successfully',
  COMMENT_FETCHED = 'Comments fetched successfully',
  BLOG_UPDATED = 'Blog updated successfully',
  BLOG_DELETED_SUCCESSFULLY = 'Blog deleted successfully',
  BLOG_UPDATED_SUCCESSFULLY = 'Blog updated successfully',
  BLOG_SLUG = 'Slug already in use',
  TITLE_REQUIRED = 'Title is required',
  TITLE_STRING = 'Title must be a string',
  TITLE_MAX_LENGTH = 'Title must be under 500 characters',
  TYPE_REQUIRED = 'Type is required',
  TYPE_STRING = 'Type must be a string',
  TYPE_MAX_LENGTH = 'Type must be under 255 characters',
  DESCRIPTION_STRING = 'Description must be a string',
  SLUG_REQUIRED = 'Slug is required',
  SLUG_VALID = 'Slug must be a valid slug (lowercase, no spaces, hyphens only)',
  THUMBNAIL_STRING = 'Thumbnail must be a string',
  COMPONENTS_REQUIRED = 'Components field is required',
  COMPONENTS_JSON = 'Components must be a valid JSON string',
  CSS_JSON = 'CSS must be a valid JSON string',
  PAGEDATA_JSON = 'Pagedata must be a valid JSON string',
  CATEGORY_ARRAY = 'Category must be an array',
  ID_REQUIRED = 'ID parameter is required',
  ID_POSITIVE_INT = 'ID must be a positive integer',
  STATUS_REQUIRED = 'Status is required',
  STATUS_BOOLEAN = 'Status must be a boolean (true or false)',
  SIDEBAR_REQUIRED = 'Sidebar is required',
  SIDEBAR_BOOLEAN = 'Sidebar must be a boolean (true or false)',
  IDS_REQUIRED = 'ids field is required',
  IDS_NON_EMPTY_ARRAY = 'ids must be a non-empty array',
  IDS_EACH_POSITIVE_INT = 'Each id must be a positive integer',
  PAGE_ADDED_SUCCESSFULLY = 'Page added successfully',
  PAGE_NOT_FOUND = 'Page not found',
  PAGE_FETCHED = 'Page fetched successfully',
  PAGE_UPDATED = 'Page updated successfully',
  PAGE_DELETED_SUCCESSFULLY = 'Page deleted successfully',
  PAGE_UPDATED_SUCCESSFULLY = 'Page updated successfully',
  FAQ_ADDED_SUCCESSFULLY = 'Faq added successfully',
  FAQ_NOT_FOUND = 'Faq not found',
  FAQ_FETCHED = 'Faq fetched successfully',
  FAQ_UPDATED = 'Faq updated successfully',
  FAQ_DELETED_SUCCESSFULLY = 'Faq deleted successfully',
  FAQ_UPDATED_SUCCESSFULLY = 'Faq updated successfully',
  FAQ_SLUG = 'Slug already in use',
  PAGE_SLUG = 'Slug already in use',
  FAQ_ID_POSITIVE_INT = 'Faq must be a positive integer',
  DATA_STRING = 'Data must be a string',
  TEMPLATE_REQUIRED = 'Template is required',
  TEMPLATE_BOOLEAN = 'Template must be a boolean (true or false)',
  FAQ_DATA_ARRAY = 'Data is required and must be a non-empty array',
  QUESTION_REQUIRED = 'Question is required',
  QUESTION_STRING = 'Question must be a string',
  ANSWER_REQUIRED = 'Answer is required',
  ANSWER_STRING = 'Answer must be a string',
  NO_PRIMARY_RECIPIENT_FOUND = 'No Primary Recipient found',
  BLOG_ID_REQUIRED = 'Blog ID is required',
  BLOG_ID_POSITIVE_INT = 'Blog ID must be a positive integer',
  COMMENT_REQUIRED = 'Comment is required',
  COMMENT_STRING = 'Comment must be a string',
  WEBSITE_URL_REQUIRED = 'Website URL is required',
  COMMENT_ADDED_SUCCESSFULLY = 'Comment added successfully',
  STATUS_UPDATED_SUCCESSFULLY = 'Status updated successfully',
  COMMENT_DELETED_SUCCESSFULLY = 'Comment deleted successfully',
  CATEGORY_ADDED_SUCCESSFULLY = 'Category added successfully',
  CATEGORY_NOT_FOUND = 'Category not found',
  CATEGORY_FETCHED = 'Category fetched successfully',
  CATEGORY_UPDATED = 'Category updated successfully',
  CATEGORY_DELETED_SUCCESSFULLY = 'Category deleted successfully',
  CATEGORY_UPDATED_SUCCESSFULLY = 'Category updated successfully',
  CATEGORY_SLUG = 'Slug already in use',
  CATEGORY_ID_POSITIVE_INT = 'Faq must be a positive integer',
  CATEGORY_ID_INVALID = 'Category ID is invalid',
  CATEGORY_ASSOCIATED_WITH_BLOG = 'Category is associated with blog, cannot delete',
  FAQ_ASSOCIATED_WITH_PAGE = 'Faq is associated with pages, cannot delete',
  // Additional validation messages
  WEBSITE_URL_VALID = 'Website URL must be a valid URL',
  USER_ID_POSITIVE_INT = 'User ID must be a positive integer',
}

export enum ValidationMessages {
  // Title validation messages
  TITLE_REQUIRED = 'Title is required',
  TITLE_STRING = 'Title must be a string',
  TITLE_MAX_LENGTH = 'Title must be under 500 characters',
  
  // Slug validation messages
  SLUG_REQUIRED = 'Slug is required',
  SLUG_VALID = 'Slug must be a valid slug (lowercase, no spaces, hyphens only)',
  
  // ID validation messages
  ID_REQUIRED = 'ID parameter is required',
  ID_POSITIVE_INT = 'ID must be a positive integer',
  BLOG_ID_REQUIRED = 'Blog ID is required',
  BLOG_ID_POSITIVE_INT = 'Blog ID must be a positive integer',
  USER_ID_POSITIVE_INT = 'User ID must be a positive integer',
  
  // Status validation messages
  STATUS_REQUIRED = 'Status is required',
  STATUS_BOOLEAN = 'Status must be a boolean (true or false)',
  
  // Array validation messages
  IDS_REQUIRED = 'ids field is required',
  IDS_NON_EMPTY_ARRAY = 'ids must be a non-empty array',
  IDS_EACH_POSITIVE_INT = 'Each id must be a positive integer',
  
  // Description validation messages
  DESCRIPTION_STRING = 'Description must be a string',
  
  // Type validation messages
  TYPE_REQUIRED = 'Type is required',
  TYPE_STRING = 'Type must be a string',
  TYPE_MAX_LENGTH = 'Type must be under 255 characters',
  
  // Comment validation messages
  COMMENT_REQUIRED = 'Comment is required',
  COMMENT_STRING = 'Comment must be a string',
  
  // URL validation messages
  WEBSITE_URL_REQUIRED = 'Website URL is required',
  WEBSITE_URL_VALID = 'Website URL must be a valid URL',
}

export enum ErrorMessages {
  INTERNAL_SERVER_ERROR = 'Something went wrong.',
}
