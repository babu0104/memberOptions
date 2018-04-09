export class User {
    public bin: string;
    public mso: string;
    public assoFlag: string;
    public ssnAlertCodes: Array<any>;
    public ssnInvalidCodes: string;
    public addrAlertCodes: string;
    public addrInvalidCodes: string;
    public phoneAlertCodes: string;
    public phoneInvalidCodes: string;
    public stateAlertCodes: string;
    public stateInvalidCodes: string;
    public fundAlertCodes: string;
    public fundInvalidCodes: string;
    public emailAlertCodes: string;
    public emailInvalidCodes: string;
    public ipAddrAlertCodes: string;
    public ipAddrInvalidCodes: string;
    public deviceAlertCodes: string;
    public deviceInvalidCodes: string;
    public nonBankCard: string;
    constructor() { }
}
