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
