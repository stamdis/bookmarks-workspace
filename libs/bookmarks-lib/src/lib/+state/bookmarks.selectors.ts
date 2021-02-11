import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BOOKMARKS_FEATURE_KEY,
  State,
  BookmarksPartialState,
  bookmarksAdapter,
} from './bookmarks.reducer';

// Lookup the 'Bookmarks' feature state managed by NgRx
export const getBookmarksState = createFeatureSelector<
  BookmarksPartialState,
  State
>(BOOKMARKS_FEATURE_KEY);

const { selectAll, selectEntities } = bookmarksAdapter.getSelectors();

export const getBookmarksLoaded = createSelector(
  getBookmarksState,
  (state: State) => state.loaded
);

export const getBookmarksError = createSelector(
  getBookmarksState,
  (state: State) => state.error
);

export const getAllBookmarks = createSelector(
  getBookmarksState,
  (state: State) => selectAll(state)
);

export const getBookmarksEntities = createSelector(
  getBookmarksState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getBookmarksState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getBookmarksEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
