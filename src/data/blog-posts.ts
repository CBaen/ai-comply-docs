export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  published: boolean;
}

export const blogPosts: BlogPost[] = [];
