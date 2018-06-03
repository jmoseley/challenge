import { BaseModel } from './base';
import { Preferences } from './preferences';

export interface User extends BaseModel {
  name: string;
  email: string;
  preferences: Preferences;
}
