export interface __CreateUpdateBrand {
    brandModel: BrandModel;
}

interface BrandModel {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    name: string;
    colorLogoUrl: string;
    bandWLogoUrl: string;
    productBrandLogo: string;
    notes: string;
    recStatus: string;
    createdDate: string;
    createdBy: number;
    modifiedDate: string;
    modifiedBy: number;
}

export interface __UpdateBrandStatusById {
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

export interface __multipleupdatestatusbyids {
    args: Args;
}

interface Args {
    idsRowVersion: IdsRowVersion[];
    status: string;
    location: string;
    ipAddress: string;
    macAddress: string;
}

interface IdsRowVersion {
    item1: number;
    item2: string;
}




