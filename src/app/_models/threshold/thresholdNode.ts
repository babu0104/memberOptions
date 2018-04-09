import { listThresholdDataNode, listRetroThresholdDataNode } from './listThresholdDataNode';

export class ThresholdNode {
    icaBin?: string;
    mso?: string;
    system:string;
    thresholdOption?: string;
    assocFlag?: string;
    lastUpdatedUserId?: string;
    name?: string;
    listThresholdUuData?: Array<listThresholdDataNode>;

    constructor() { }
}

export class RetroThresholdNode {
    icaBin?: string;
    mso?: string;
    system:string;
    thresholdOption?: string;
    assocFlag?: string;
    lastUpdatedUserId?: string;
    name?: string;
    listRetroThresholdUuData?: Array<listRetroThresholdDataNode>;

    constructor() { }
}
