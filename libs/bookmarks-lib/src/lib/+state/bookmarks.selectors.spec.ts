import { BookmarksEntity } from './bookmarks.models';
import { State, bookmarksAdapter, initialState } from './bookmarks.reducer';
import * as BookmarksSelectors from './bookmarks.selectors';

describe('Bookmarks Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBookmarksId = (it) => it['id'];
  const createBookmarksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BookmarksEntity);

  let state;

  beforeEach(() => {
    state = {
      bookmarks: bookmarksAdapter.setAll(
        [
          createBookmarksEntity('PRODUCT-AAA'),
          createBookmarksEntity('PRODUCT-BBB'),
          createBookmarksEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Bookmarks Selectors', () => {
    it('getAllBookmarks() should return the list of Bookmarks', () => {
      const results = BookmarksSelectors.getAllBookmarks(state);
      const selId = getBookmarksId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = BookmarksSelectors.getSelected(state);
      const selId = getBookmarksId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getBookmarksLoaded() should return the current 'loaded' status", () => {
      const result = BookmarksSelectors.getBookmarksLoaded(state);

      expect(result).toBe(true);
    });

    it("getBookmarksError() should return the current 'error' state", () => {
      const result = BookmarksSelectors.getBookmarksError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
