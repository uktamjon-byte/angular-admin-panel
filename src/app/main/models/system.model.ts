import { GroupType } from "../enums/system.enum";

export class Groups implements Groups {
    id: number;
    accountId: number;
    title: string;
    groupType: GroupType;
    synced?: boolean = true;
    constructor(
      _id: number,
      _accountId: number,
      _title: string,
      _groupType: GroupType
    ) {
      this.id = _id;
      this.accountId = _accountId;
      this.title = _title;
      this.groupType = _groupType;
    }
  }

  export class GroupRole{
    id: number;
    groupId: number;
    title: string;
    tags: string[];
    checked?: boolean;
    constructor(
      _id: number,
      _groupId: number,
      _title: string,
      _tags: string[],
      _checked: boolean = false
    ) {
      this.id = _id;
      this.groupId = _groupId;
      this.title = _title;
      this.tags = _tags;
      this.checked = _checked;
    }

   }