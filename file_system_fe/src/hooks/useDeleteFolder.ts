import { useMutation } from "@tanstack/react-query";
import folderService from "../services/folder.service";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete folderr"],
    mutationFn: (id: number) => folderService.deleteById(id),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["filesStructure"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });
};
