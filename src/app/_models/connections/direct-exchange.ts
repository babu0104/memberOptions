export class IcsConnBaseTwoDirectExchangeDto {
    recFormatOut?: string;
    confirmation?: boolean;
    auditAdvice?: boolean;
    scheduledBatch?: boolean;
    vconSeq?: boolean;
    clearModel() {
        this.recFormatOut = '';
        this.confirmation = false;
        this.auditAdvice = false;
        this.scheduledBatch = false;
        this.vconSeq = false;
    }
    constructor() { }
}
