export interface File {
  id: number;
  name: string;
  parentFolderId: number | null;
  isFolder: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
  byteSize: number;
}

export interface IFile {
  name: string;
  content: string;
  parentFolderId?: number | null;
}

export interface IUpdateFile {
  name?: string;
  content?: string;
}
