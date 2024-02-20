import { useMutation } from "@tanstack/react-query";
import folderService from "../services/folder.service";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update folder"],
    mutationFn: (data: { id: number; name: string }) =>
      folderService.updateFolder(data.id, data.name),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["filesStructure"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });
};
