export class IcsConnectionPartnerOptDto {
    paramName?: boolean;
    option?: string;
    identityType?: string;
    customerNumber?: string;
    constructor() { }
}
export class ListIcsConnectionsOnlineInteractiveDto {
    netName?: string;
    connectDesc?: string;
    vaisInd?: string;
    processFlag?: string;
    icsConnectionPartnerOptDto?: Array<IcsConnectionPartnerOptDto>;
    vconSeq?: string;
    constructor() { }
}
export class Online {
    netName?: string;
    connectDesc?: string;
    vaisInd?: string;
    processFlag?: string;

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
        this.netName = '';
        this.connectDesc = '';
        this.vaisInd = '';
        this.processFlag = '';

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
export class Online1 extends Online {
    constructor() {
        super();
    }
}
export class Online2 extends Online {
    constructor() {
        super();
    }
}
export class Online3 extends Online {
    constructor() {
        super();
    }
}
export class Online4 extends Online {
    constructor() {
        super();
    }
}
