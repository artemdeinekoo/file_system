import { useMutation } from "@tanstack/react-query";
import folderService from "../services/folder.service";
import { useQueryClient } from "@tanstack/react-query";

export const useAddFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add folder"],
    mutationFn: (data: { name: string; parentFolderId: number | null }) =>
      folderService.addFolder(data),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["filesStructure"] });
    },
  });
};
