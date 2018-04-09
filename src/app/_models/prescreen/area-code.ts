export class FromAndToCodes {
	fromCode?: string;
	toCode?: string;
}
export class AreaCode {
	bin?: string;
	mso?: string;
	assocFlag?: string;
	projectNum?: string;
	criteriaLevel?: string;
	areaCodeRange: Array<FromAndToCodes>;
	loadts?: string;
	lastUpdtUser?: string;
	currentUser?: string;
	memberName?: string;
	constructor() { }
}
