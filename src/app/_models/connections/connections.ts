import { IcsConnBaseTwoDirectExchangeDto } from './direct-exchange';
import { ListIcsConnectionsFileTransferDto } from './file-transfer';
import { ListIcsConnectionsOnlineInteractiveDto } from './online-interactive';
import { IcsConnectionsIcsDirectDto } from './ICSDirect';


export class Connections {
    bin?: string;
    mso?: string;
    loadTs?: string;
    system?: string;
    icsConnBaseTwoDirectExchangeDto?: IcsConnBaseTwoDirectExchangeDto;
    listIcsConnectionsFileTransferDto?: ListIcsConnectionsFileTransferDto;
    listIcsConnectionsOnlineInteractiveDto?: ListIcsConnectionsOnlineInteractiveDto;
    icsConnectionsIcsDirectDto?: IcsConnectionsIcsDirectDto;
    currentUser?: string;
    lastUpdatedUserId?: string;
    vaisInd?: string;

    constructor() { }
}
