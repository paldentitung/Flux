export type Comment = {
  id: string;
  text: string;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
  };
};

export type Post = {
  id: string;
  content: string;
  image?: string | null;
  likes: number;
  createdAt: string;

  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };

  comments: Comment[];
};
