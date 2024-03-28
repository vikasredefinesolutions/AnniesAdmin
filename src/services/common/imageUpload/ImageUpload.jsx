import { API } from "helpers/API";

class ImageUpload {
  uploadImage(imagePath, imageObj) {
    return API.post(`/upload/image?folderPath=${imagePath}`, imageObj);
  }
  deleteImage(imagePath) {
    return API.get(`/delete/file?folderPath=${imagePath}`);
  }
  uploadZipFile(filePath, zipPath, object) {
    return API.post(`/upload/zip?filePath=${filePath}&zipPath=${zipPath}`, object);
  }

  getFileNameByRootPath(FolderPath) {
    return API.get(`/Blob/GetFilesByrootname.json?FolderPath=${FolderPath}`);
  }
}

const ImageUploadCls = new ImageUpload();

export default ImageUploadCls;
