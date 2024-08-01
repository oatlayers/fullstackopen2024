import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import service from "../services/service";
import { useNotification } from "../context/NotificationContext";

export const useBlogs = () => {
  const queryClient = useQueryClient();
  const { notifDispatch } = useNotification();

  const getAndSort = async () => {
    const res = await service.getAll();
    return res.sort((a, b) => b.likes - a.likes);
  };

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAndSort,
  });

  const createBlogMutation = useMutation({
    mutationFn: (blogObject) => service.create(blogObject),
    onSuccess: (returnedBlog) => {
      queryClient.invalidateQueries(["blogs"]);
      notifDispatch({
        type: "SET_NOTIFICATION",
        payload: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      });
      setTimeout(() => {
        notifDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: (updateData) =>
      service.update(updateData.id, updateData.newLike),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const removeBlogMutation = useMutation({
    mutationFn: (id) => service.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    blogs,
    isLoading,
    createBlogMutation,
    updateBlogMutation,
    removeBlogMutation,
  };
};
