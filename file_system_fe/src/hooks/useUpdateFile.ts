import { useMutation } from "@tanstack/react-query";
import fileService from "../services/file.service";
import { useQueryClient } from "@tanstack/react-query";
import { IUpdateFile } from "../interfaces/File";

export const useUpdateFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update file"],
    mutationFn: (data: { id: number; updateFile: IUpdateFile }) =>
      fileService.updateFile(data.id, data.updateFile),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["filesStructure"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });
};
