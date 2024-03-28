export interface __AllStoresObj {
    auth: Auth
    alertMessage: AlertMessage
    user: User
    location: Location
    CompanyConfiguration: CompanyConfiguration
    permission: any
    MenuListByUserRoleReducers: MenuListByUserRoleReducers
    SearchQueryReducers: SearchQueryReducers
    GlobalLoaderReducer: GlobalLoaderReducer
    AdminAppConfigReducers: AdminAppConfigReducers
    ThemeConfiguration: ThemeConfiguration
    TempDataReducer: TempDataReducer
}

export interface Auth {
    isAuthorized: boolean
    token: string
}

export interface AlertMessage {
    view: boolean
    message: string
    type: string
}

export interface User {
    id: number
    firstname: string
    lastname: string
    email: string
    password: string
    phone: string
    lastLoginTime: string
    userPhoto: string
    isNewsSubscription: boolean
    activeUserCode: string
    passwordChangeDate: string
    authToken: number
    authTokenExpiryDate: string
    isSuperUser: boolean
    roleName: string
    recStatus: string
    createdDate: string
    createdBy: number
    modifiedDate: string
    modifiedBy: number
    rowVersion: string
    location: string
    ipAddress: string
    macAddress: string
    reportingTo: number
    role: string
}

export interface Location {
    browser: string
    location: string
    ipAddress: string
    macAddress: string
}

export interface CompanyConfiguration {
    data: string
    module: string
    createdName: string
    modifiedName: string
    id: number
    fullName: string
    shortName: string
    email: string
    phone: string
    companyLogoURL: string
    logoutTime: string
    twoFactorEnabled: boolean
    mS365Enabled: boolean
    recStatus: string
    createdDate: string
    createdBy: number
    modifiedDate: string
    modifiedBy: number
    rowVersion: string
    location: string
    ipAddress: string
    macAddress: string
    headerLogo: string
}

export interface MenuListByUserRoleReducers {
    data: any[]
    selectedMenu: string
}

export interface SearchQueryReducers {
    searchQuery: string
    toFill: boolean
    currentTab: number
}

export interface GlobalLoaderReducer {
    toLoad: boolean
    howMany: number
}

export interface AdminAppConfigReducers {
    "azure:BlobUrl": string
    "azure:StorageAccountAccessKey": string
    "azure:StorageAccountName": string
    "cdn:RootDirectory": string
    "cdnarchive:RootDirectory": string
    keyCompressimagePanda: string
    transactionSrc: string
    ups: string
}

export interface ThemeConfiguration {
    id: number
    storeLogoUrl: string
    headerLogoUrl: string
    faviconUrl: string
    emailLogoUrl: string
    bFontFamily: string
    bFontSize: string
    bFontWeight: string
    bLineHeight: string
    bLetterSpacing: string
    sBgcolor: string
    sbgActivecolor: string
    sbGhovercolor: string
    sFontcolor: string
    sActiveColor: string
    sHoverColor: string
    pFontFamily: string
    pFontSize: string
    pFontWeight: string
    pLineHeight: string
    pLetterSpacing: string
    cBgcolor: string
    cbgActivecolor: string
    cbGhovercolor: string
    cFontcolor: string
    cActiveColor: string
    cHoverColor: string
    primary: string
    secondary: string
    red: string
    green: string
    yellow: string
    loginPageStyle: string
    loginBackgroundUrl: string
    recStatus: string
    createdDate: string
    createdBy: number
    modifiedDate: string
    modifiedBy: number
    rowVersion: string
    location: string
    ipAddress: string
    macAddress: string
}

export interface TempDataReducer {
    order: Order
    storeBuilderCategoryData: StoreBuilderCategoryData
    currentPageIndexData: CurrentPageIndexData
    currentStoreData: any
}

export interface Order {
    storeIdFromDropDown: any[]
    storeId: number
}

export interface StoreBuilderCategoryData { }

export interface CurrentPageIndexData {
    pageNo: number
    url: string
}