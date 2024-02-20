import axios from "axios";
import { IFolder, IUpdateFolder } from "../interfaces/Folder";

class folderService {
  private API_URL = `${process.env.REACT_APP_API_URL}/folders`;

  async addFolder({ name, parentFolderId }: IFolder) {
    return axios.post<any, any, IFolder>(`${this.API_URL}/`, {
      name: name,
      parentFolderId: parentFolderId,
    });
  }

  async getById(id: number) {
    return axios.get(`${this.API_URL}/${id}`);
  }

  async updateFolder(id: number, name: string) {
    return axios.put<any, any, IUpdateFolder>(`${this.API_URL}/${id}`, {
      name,
    });
  }

  async deleteById(id: number) {
    return axios.delete(`${this.API_URL}/${id}`);
  }
}

export default new folderService();
