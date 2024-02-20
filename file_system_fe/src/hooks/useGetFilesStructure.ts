import { useQuery } from "@tanstack/react-query";
import fileSystemService from "../services/fileSystem.service";

export const useGetFilesStructure = (folderId: number | null) => {
  return useQuery({
    queryKey: ["filesStructure"],
    queryFn: () => fileSystemService.getFileStructure(folderId),
    select: ({ data }) => data,
  });
};
