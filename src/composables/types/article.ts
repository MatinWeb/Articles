export interface ArticleParam {
  body: string;
  description: string;
  tagList: string[];
  title: string;
}

export interface Author {
  username: string;
  bio?: string;
  image?: string;
}

export interface Article {
  author: Author;
  body?: string;
  createdAt: string;
  description?: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList?: string[];
  title: string;
  updatedAt: string;
}

export interface Comment {
  author: Author;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}
