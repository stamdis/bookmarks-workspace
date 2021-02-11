import { BookmarksEntity } from './bookmarks.models';
import * as BookmarksActions from './bookmarks.actions';
import { State, initialState, reducer } from './bookmarks.reducer';

describe('Bookmarks Reducer', () => {
  const createBookmarksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BookmarksEntity);

  beforeEach(() => {});

  describe('valid Bookmarks actions', () => {
    it('loadBookmarksSuccess should return set the list of known Bookmarks', () => {
      const bookmarks = [
        createBookmarksEntity('PRODUCT-AAA'),
        createBookmarksEntity('PRODUCT-zzz'),
      ];
      const action = BookmarksActions.loadBookmarksSuccess({ bookmarks });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
