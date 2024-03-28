export interface __AppConfigUpdateStatusById {
    args: Args;
}

interface Args {
    id: number;
    rowVersion: string;
    status: string;
    location: string;
    ipAddress: string;
    macAddress: string;
}


export interface __AppConfigUpdateStatus {
    appConfigModel: __AppConfigModel;
}

export interface __AppConfigModel {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    name: string;
    value: string;
    description: string;
    isDeleted: boolean;
    storeId: number;
    recStatus: string;
}


