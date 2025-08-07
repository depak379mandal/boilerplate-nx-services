export interface BlogCategorys {
    title: string;
    description: string
    slug: string
    status?: boolean
    isDeleted?: boolean
}


export interface BlogCategoryOptions {
    page: number;
    limit: number;
    skip: number;
    sortingDirection: string;
    sortingKey: string;
    filterType?: string;
    filterValue?: any;
    searchTerm?: string;
}