import { Record } from 'immutable';

const DirectoryRecord = new Record({
  type: '',
  path: '',
  data: {},
  lastUpdate: undefined,
});

export class Directory extends DirectoryRecord {
}
