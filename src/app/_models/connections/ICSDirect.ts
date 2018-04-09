export class IcsConnectionsIcsDirectDto {
    processFlag?: string;
    connectDesc?: string;
    recFormatOut?: string;
    confirmation?: boolean;
    auditAdvice?: boolean;
    clearModel() {
        this.processFlag = '';
        this.connectDesc = '';
        this.recFormatOut = '';
        this.confirmation = false;
        this.auditAdvice = false;
    }
    constructor() { }
}
