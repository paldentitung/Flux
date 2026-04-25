import type { Post } from "../types/post";

export const mockPosts: Post[] = [
  {
    id: "post_1",
    user: {
      id: "user_1",
      name: "Ava Mercer",
      username: "avamercer",
      avatar: "/avatars/ava.jpg",
    },
    content:
      "Just finished building my new UI system. Clean design really changes how you think about products.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    likes: 124,
    comments: [
      {
        id: "c1",
        user: {
          name: "John Doe",
          avatar: "/avatars/john.jpg",
        },
        text: "This looks super clean 🔥",
        createdAt: "2h ago",
      },
    ],
    createdAt: "2h ago",
  },

  {
    id: "post_2",
    user: {
      id: "user_2",
      name: "Liam Carter",
      username: "liamc",
      avatar: "/avatars/liam.jpg",
    },
    content:
      "MERN stack projects hit different when you finally understand architecture instead of just coding.",
    image: null,
    likes: 89,
    comments: [],
    createdAt: "4h ago",
  },

  {
    id: "post_3",
    user: {
      id: "user_3",
      name: "Sophia Lee",
      username: "sophialee",
      avatar: "/avatars/sophia.jpg",
    },
    content:
      "Minimal UI > complex UI. Every extra element should justify its existence.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    likes: 302,
    comments: [
      {
        id: "c2",
        user: {
          name: "Alex Kim",
          avatar: "/avatars/alex.jpg",
        },
        text: "Totally agree on this.",
        createdAt: "1d ago",
      },
    ],
    createdAt: "1d ago",
  },

  {
    id: "post_4",
    user: {
      id: "user_4",
      name: "Daniel Smith",
      username: "danieldev",
      avatar: "/avatars/daniel.jpg",
    },
    content:
      "Built a real-time chat UI today. Zustand makes state management so clean compared to Redux.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    likes: 211,
    comments: [],
    createdAt: "2d ago",
  },

  {
    id: "post_5",
    user: {
      id: "user_5",
      name: "Emma Watson",
      username: "emmaw",
      avatar: "/avatars/emma.jpg",
    },
    content:
      "Designing dark mode systems is harder than it looks. Contrast and hierarchy matter a lot.",
    image: null,
    likes: 177,
    comments: [
      {
        id: "c3",
        user: {
          name: "Mike Ross",
          avatar: "/avatars/mike.jpg",
        },
        text: "True, accessibility is key.",
        createdAt: "3d ago",
      },
    ],
    createdAt: "3d ago",
  },
];
