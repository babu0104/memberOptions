export class Bucket {
    applVelo?: string;
    bucket?: number;
    applVelocityHigh?: string;
    appVelocityLow?: string;
    appVelocityThreshold?: string;
    appVelocityThresholdAmt?: string;

    constructor() { }
}

export class PcsThresholdFinalDataNode {
    icaBin?: string;
    mso?: string;
    system:string;
    reponseCode?: string;
    lastUpdatedUserId?: string;
    loadTS?: string;
    pcsThresholdUuDataDto?: Array<Bucket>;

    constructor() { }
}
