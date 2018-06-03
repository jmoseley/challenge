import { BaseModel } from './base';

export enum ChallengeInviteStatus {
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
}

export interface ChallengeInvite
  extends ChallengeInviteCreateOptions,
    BaseModel {}

export interface ChallengeInviteCreateOptions {
  challengeId: string;
  inviteeId?: string;
  email?: string;
  status: ChallengeInviteStatus;
}
