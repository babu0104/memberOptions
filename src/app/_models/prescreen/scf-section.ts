export class FromAndToCodes {
	fromCode?: string;
	toCode?: string;
}
export class SfcSection {
	bin?: string;
	mso?: string;
	assocFlag?: string;
	projectNum?: string;
	criteriaLevel?: string;
	name?: string;
	scfRange: Array<FromAndToCodes>;
	loadts?: string;
	lastUpdtUser?: string;
	currentUser?: string;
	memberName?: string;

	constructor() { }
}
