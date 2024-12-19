import { GroupType } from '../enums/system.enum';

export interface IGroups {
  id?: number;
  accountId: number;
  title: string;
  groupType: GroupType;
}