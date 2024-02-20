export interface Folder {
  id: number;
  name: string;
  parentFolderId: number | null;
  isFolder: boolean;
  createdAt: string;
  updatedAt: string;
  byteSize: number;
  setFolderId: (id: number) => void;
}

export interface IFolder {
  name: string;
  parentFolderId?: number | null;
}

export interface IUpdateFolder extends Omit<IFolder, "parentFolderId"> {}
