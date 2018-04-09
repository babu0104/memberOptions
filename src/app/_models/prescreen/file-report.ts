export class ContactInfoDto {
	mbrName?: string;
	mbrContact?: string;
	mbrAddr1?: string;
	mbrAddr2?: string;
	mbrCity?: string;
	mbrState?: string;
	mbrZipCode?: string;
	mbrphone?: string;
	mbrFax?: string;
	mbrEmail?: string;
}

export class FileReport {
	icaBin?: string;
	mso?: string;
	assocFlag?: string;
	projectNum?: string;
	criteriaLevel?: string;
	prescreenContactInfoDto?: ContactInfoDto;
	iprocName?: string;
	iprocContactName?: string;
	iprocAddr1?: string;
	iprocAddr2?: string;
	iprocCity?: string;
	iprocState?: string;
	iprocZipCode?: string;
	iprocPhone?: string;
	iprocFax?: string;
	iprocEmail?: string;
	approvalStatus?: string;
	recurringStartDate?: string;
	auditReport?: string;
	matchBackAuditReport?: boolean;
	activityReport?: boolean;
	fileOuputReport?: boolean;
	superFileFmt?: boolean;
	media?: string;
	fileTransferIp?: string;
	maskSsn?: string;
	fileDelivery?: string;
	loadTs?: string;
	currentUser?: string;
	lastUpdtUser?: string;

	constructor() { }
}
