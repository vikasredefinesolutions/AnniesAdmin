import { API } from "helpers/API";
class BlobUploadService {
    getAndCheckFilesByFolderPath(pathName) {
        return API.get(`/Blob/GetFilesByrootname.json?FolderPath=${pathName}`);
    }
}

const BlobUploadServiceCls = new BlobUploadService();
export default BlobUploadServiceCls;
