import { BaseModel } from './base';

export enum Errors {
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  ALREADY_MEMBER = 'ALREADY_MEMBER',
}

export interface Challenge extends ChallengeCreateOptions, BaseModel {
  members: string[];
  creatorId: string;
}

export interface ChallengeCreateOptions {
  name: string;
  startDayOfWeek: number;
  durationWeeks: number;
  distanceMiles: number;
  repeats: boolean;
}

export interface ChallengeInviteOptions {
  email: string;
  challengeId: string;
}
