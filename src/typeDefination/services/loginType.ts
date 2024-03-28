export interface __TokenUsingConfiguration {
    email: string;
    password: string;
    browser: string;
    location: string;
    ipAddress: string;
    macAddress: string;
}

export interface __Logout {
    browser: string;
    location: string;
    ipAddress: string;
    macAddress: string;
}

export interface __CreatePassword {
    args: Args;
}

interface Args {
    id: number;
    code: string;
    newPassword: string;
    reEnterPassword: string;
}

export interface __CreateAndUpdatePassExpUsingConfiguration {
    id: number;
    currentPassword: string;
    newPassword: string;
    reEnterPassword: string;
}

export interface __CheckPasswordLinkExpired {
    args: Args;
}

interface Args {
    id: number;
    code: string;
}

