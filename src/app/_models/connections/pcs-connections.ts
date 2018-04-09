export class PcsConnectionPartnerOptDto {
    paramName?: boolean;
    option?: string;
    identityType?: string;
    product?: string;
    constructor() { }
}
export class FileTransfer {
    confirmation?: boolean;
    messageCode?: string;
    messageText?: string;
    connectDesc?: string;
    vconSeq?: boolean;
    clear() {
        this.confirmation = false;
        this.messageCode = '';
        this.messageText = '';
        this.connectDesc = '';
        this.vconSeq = false;
    }
}
export class OnlineInteractive {
    netName?: string;
    connectDesc?: string;
    pcsConnectionPartnerOptDto?: Array<PcsConnectionPartnerOptDto>;

    piParamName?: boolean;
    piIdentityType?: string;
    piProduct?: string;

    ppParamName?: boolean;
    ppIdentityType?: string;
    ppProduct?: string;

    pdParamName?: boolean;
    pdIdentityType?: string;
    pdProduct?: string;

    psParamName?: boolean;
    psIdentityType?: string;
    psProduct?: string;

    poParamName?: boolean;
    poIdentityType?: string;
    poProduct?: string;

    pnParamName?: boolean;
    pnIdentityType?: string;
    pnProduct?: string;

    vconSeq?: boolean;
    clear() {
        this.netName = '';
        this.connectDesc = '';

        this.piParamName = false;
        this.piIdentityType = '';
        this.piProduct = '';

        this.ppParamName = false;
        this.ppIdentityType = '';
        this.ppProduct = '';

        this.pdParamName = false;
        this.pdIdentityType = '';
        this.pdProduct = '';

        this.psParamName = false;
        this.psIdentityType = '';
        this.psProduct = '';

        this.poParamName = false;
        this.poIdentityType = '';
        this.poProduct = '';

        this.pnParamName = false;
        this.pnIdentityType = '';
        this.pnProduct = '';
        this.vconSeq = false;
    }
}
export class PcsConnections {
    bin?: string;
    mso?: string;
    system?: string;
    assocFlag?: string;
    pcsConnectionsFileTranserDto?: FileTransfer;
    pcsConnectionsOnlineInteractiveDto?: OnlineInteractive;
    loadTs?: string;
    currentUser?: string;
    lastUpdtUser?: string;
    vaisInd?: string;
    constructor() { }
}
