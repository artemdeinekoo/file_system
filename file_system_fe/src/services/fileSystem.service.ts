import axios from "axios";

class fileSystemService {
  private API_URL = `${process.env.REACT_APP_API_URL}`;

  async getFileStructure(folderId: number | null) {
    if (folderId) {
      return axios.get(`${this.API_URL}/folders/${folderId}/objects`);
    } else {
      return axios.get(this.API_URL);
    }
  }

  async searchForObjects(query: string | null) {
    return axios.get(`${this.API_URL}/search/${query}`);
  }
}

export default new fileSystemService();
