import { API } from "helpers/API";

class ImportExportService {

    getExportTypes(sourceId, type) {
        return API.get(`/Exporttype/${sourceId}/${type}.json`);
    }
    getExportdbFields(sourceId, ExportType) {
        return API.get(`/export/getexportdbfieldList/${sourceId}/${ExportType}.json`);
    }
    exportData(ExportDataObj) {
        return API.post(`/export/exportdata.json`, ExportDataObj);
    }
    importData(ImportDataObj, parameters) {
        return API.post(`/ImportMaster.json?${parameters}`, ImportDataObj);
    }
    getLogData(logObj) {
        return API.post(`/ImportLog.json`, logObj);
    }
}

const ImportExportServiceCls = new ImportExportService();

export default ImportExportServiceCls;
