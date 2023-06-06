export interface NaverBooks {
  display: number;
  items: NaverBook[];
  lastBuildDate: string;
  start: number;
  total: number;
}

export interface NaverBook {
  author: string;
  description: string;
  discount: string;
  image: string;
  isbn: string;
  link: string;
  pubdate: string;
  publisher: string;
  title: string;
}

export interface CreateNovelData {
  title: string;
  body: string;
}

export interface UserBook {
  author: string;
  body: string;
  createdAt: string;
  description: string;
  discount: string;
  id: number;
  image: string;
  isLiked: boolean;
  isbn: string;
  link: string;
  pubdate: string;
  publisher: string;
  rating: string;
  title: string;
  totalComments: number;
  totalLikes: number;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
  };
  userId: string;
  userImages: string[];
}
