import { useQuery } from "@tanstack/react-query";
import service from "../services/service";

export const useUsers = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await service.getUsers(),
  });

  return { users };
};
