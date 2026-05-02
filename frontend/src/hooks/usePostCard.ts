import { useState, useRef } from "react";
import { formatDistanceToNow, differenceInHours } from "date-fns";
import { usePosts } from "../hooks/usePosts.ts";
import type { Post } from "../types/post.types";
export const usePostCard = (post: Post) => {
  const { handleDeletePost, handleUpdatePost, loading } = usePosts();

  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return differenceInHours(new Date(), d) < 24
      ? formatDistanceToNow(d, { addSuffix: true })
      : d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  const openEdit = () => {
    setContent(post.content);
    setExistingImages(post.images ?? []);
    setPreviews([]);
    setFiles([]);
    setEditOpen(true);
  };

  const closeEdit = () => {
    previews.forEach(URL.revokeObjectURL);
    setContent("");
    setFiles([]);
    setPreviews([]);
    setEditOpen(false);
  };

  const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...selected]);
    setPreviews((prev) => [...prev, ...selected.map(URL.createObjectURL)]);
  };

  const removeExisting = (i: number) =>
    setExistingImages((prev) => prev.filter((_, idx) => idx !== i));

  const removeNew = (i: number) => {
    URL.revokeObjectURL(previews[i]);
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  };

  const confirmDelete = async () => {
    await handleDeletePost(post._id);
    setDeleteOpen(false);
  };

  const confirmUpdate = async () => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("existingImages", JSON.stringify(existingImages));
    files.forEach((f) => formData.append("images", f));
    await handleUpdatePost(post._id, formData);
    closeEdit();
  };

  return {
    menuOpen,
    setMenuOpen,
    deleteOpen,
    setDeleteOpen,
    editOpen,
    openEdit,
    closeEdit,
    content,
    setContent,
    previews,
    existingImages,
    fileRef,
    addFiles,
    removeExisting,
    removeNew,
    confirmDelete,
    confirmUpdate,
    loading,
    formatDate,
  };
};
