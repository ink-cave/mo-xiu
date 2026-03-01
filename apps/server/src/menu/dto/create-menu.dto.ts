export class CreateMenuDto {
  name: string = '';
  type: string = '';
  parentId?: number;
  path?: string;
  component?: string;
  permission?: string;
  icon?: string;
  sort: number = 0;
  status: number = 1;
}
