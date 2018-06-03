import { BaseModel } from './base';

export interface Activity extends ActivityCreateOptions, BaseModel {}

export interface ActivityCreateOptions {
  userId: string;
  name: string;
  type: string;
  startDate: Date;
  movingTime: number;
  totalTime: number;
  distance: number;
  elevation: number;
  provider: string;
  providerId: string;
}
