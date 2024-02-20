import { useMutation } from "@tanstack/react-query";
import fileService from "../services/file.service";
import { useQueryClient } from "@tanstack/react-query";

export const useAddFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add file"],
    mutationFn: (data: {
      name: string;
      content: string;
      parentFolderId: number | null;
    }) => fileService.addFile(data),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["filesStructure"] });
    },
  });
};
