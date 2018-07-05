import { Preferences } from './preferences';

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: Preferences;
}
