import { useMutation } from "@tanstack/react-query";
import fileService from "../services/file.service";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete file"],
    mutationFn: (id: number) => fileService.deleteById(id),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["filesStructure"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });
};
