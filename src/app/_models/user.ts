export class User {
    userName?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    secImage?: string;
    secPhrase?: string;
    userId?: string;
    role?: string;
    authToken?: string;
    refreshToken?:string;
    isUserNamePresent?: boolean;
    isActive?: boolean;
    isAuthenticated?: any;
    clear() {
        this.userName = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.secImage = '';
        this.secPhrase = '';
        this.userId = '';
        this.role = '';
        this.authToken = '';
        this.refreshToken='';
        this.isUserNamePresent = false;
        this.isActive = false;
        this.isAuthenticated = false;
    }
}
