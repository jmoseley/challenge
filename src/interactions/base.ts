import { Interactions } from 'redux-interactions';

export const INTERACTIONS_MOUNT_POINT = 'interactions';

/*
 needed to allow interactions to sit along standard reducers and apollo reducer.
 state looks like this:
 {
   ...normalReducers
   ...apollo
   interactions: combineInteractions({...});
 }
*/
export default class BaseInteraction extends Interactions {
  public setMountPoint(mountPoint: string[]) {
    this.mountPoint = [INTERACTIONS_MOUNT_POINT].concat(mountPoint);
  }
}
