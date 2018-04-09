import { IntMemberTblDto } from './intMemberTblDto';
import { IntMemberIcsDirectTblDto } from './intMemberIcsDirectTblDto';
import { IcsMemberBinBidAssocDto } from './icsMemberBinBidAssocDto';

export class Contact {
    businessId?: string;
    icaBin?: string;
    system?: string;
    newBidBin?: boolean;
    intMemberTblDto?: IntMemberTblDto;
    intMemberIcsDirectTblDto?: IntMemberIcsDirectTblDto;
    icsMemberBinBidAssocDto?: IcsMemberBinBidAssocDto;
    bidModified?: boolean;
    extractTs?: Date;
    loadTs?: Date;
    lastUpdtUserId?: string;
}
