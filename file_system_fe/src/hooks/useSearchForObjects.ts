import { useQuery } from "@tanstack/react-query";
import fileSystemService from "../services/fileSystem.service";

export const useSearchForObjects = (query: string | null) => {
  return useQuery({
    queryKey: ["search"],
    queryFn: () => fileSystemService.searchForObjects(query),
    select: ({ data }) => data,
  });
};
