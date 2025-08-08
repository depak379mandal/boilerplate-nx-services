export interface Blogs {
    title: string;
    description: string
    slug: string
    category?: number[]
    components?: string
    css?: string
    pagedata?: string
    status?: boolean
    thumbnail: string
    isDeleted?: boolean
}

export interface BlogComments {
  blog_id: number;
  user_id?: number;
  comment: string;
  website_url?: string;
  status?: boolean;
}


export interface BlogOptions {
    page: number;
    limit: number;
    skip: number;
    sortingDirection: string;
    sortingKey: string;
    filterType?: string;
    filterValue?: any;
    searchTerm?: string;
}