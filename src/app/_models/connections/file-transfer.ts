export class IcsConnectionPartnerOptDto {
    paramName?: boolean;
    option?: string;
    identityType?: string;
    customerNumber?: string;


    constructor() { }
}


export class ListIcsConnectionsFileTransferDto {
    recLayoutIn?: string;
    recLayoutOut?: string;
    recFormatOut?: string;
    confirmation?: string;
    auditAdvice?: string;
    scheduledBatch?: string;
    nullsFlag?: string;
    processFlag?: string;
    messageCode?: string;
    messageText?: string;
    connectDesc?: string;
    icsConnectionPartnerOptDto = IcsConnectionPartnerOptDto;
    vconSeq?: boolean;
}


export class FileTransfer {
    recLayoutIn?: string;
    recLayoutOut?: string;
    recFormatOut?: string;
    confirmation?: boolean;
    auditAdvice?: boolean;
    scheduledBatch?: boolean;
    nullsFlag?: string;
    processFlag?: string;
    messageCode?: string;
    messageText?: string;
    connectDesc?: string;

    piParamName?: boolean;
    piOption?: string;
    piIdentityType?: string;
    piCustomerNumber?: string;

    paParamName?: boolean;
    paOption?: string;
    paIdentityType?: string;
    paCustomerNumber?: string;

    pbParamName?: boolean;
    pbOption?: string;
    pbIdentityType?: string;
    pbCustomerNumber?: string;

    pcParamName?: boolean;
    pcOption?: string;
    pcIdentityType?: string;
    pcCustomerNumber?: string;
    vconSeq?: boolean;

    clear() {
        this.recLayoutIn = '';
        this.recLayoutOut = '';
        this.recFormatOut = '';
        this.confirmation = false;
        this.auditAdvice = false;
        this.scheduledBatch = false;
        this.nullsFlag = '';
        this.processFlag = '';
        this.messageCode = '';
        this.messageText = '';
        this.connectDesc = '';

        this.piParamName = false;
        this.piOption = '';
        this.piIdentityType = '';
        this.piCustomerNumber = '';

        this.paParamName = false;
        this.paOption = '';
        this.paIdentityType = '';
        this.paCustomerNumber = '';

        this.pbParamName = false;
        this.pbOption = '';
        this.pbIdentityType = '';
        this.pbCustomerNumber = '';

        this.pcParamName = false;
        this.pcOption = '';
        this.pcIdentityType = '';
        this.pcCustomerNumber = '';
        this.vconSeq = false;
    }

}

export class FileTransfer1 extends FileTransfer {
    constructor() {
        super();
    }
}
export class FileTransfer2 extends FileTransfer {
    constructor() {
        super();
    }
}
export class FileTransfer3 extends FileTransfer {
    constructor() {
        super();
    }
}
