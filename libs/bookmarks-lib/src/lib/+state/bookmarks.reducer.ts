import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as BookmarksActions from './bookmarks.actions';
import { BookmarksEntity } from './bookmarks.models';

export const BOOKMARKS_FEATURE_KEY = 'bookmarks';

export interface State extends EntityState<BookmarksEntity> {
  selectedId?: string | number; // which Bookmarks record has been selected
  loaded: boolean; // has the Bookmarks list been loaded
  error?: string | null; // last known error (if any)
}

export interface BookmarksPartialState {
  readonly [BOOKMARKS_FEATURE_KEY]: State;
}

export const bookmarksAdapter: EntityAdapter<BookmarksEntity> = createEntityAdapter<BookmarksEntity>();

export const initialState: State = bookmarksAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const bookmarksReducer = createReducer(
  initialState,
  on(BookmarksActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(BookmarksActions.loadBookmarksSuccess, (state, { bookmarks }) =>
    bookmarksAdapter.setAll(bookmarks, { ...state, loaded: true })
  ),
  on(BookmarksActions.loadBookmarksFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(BookmarksActions.deleteBookmark, (state, { bookmark }) =>
    bookmarksAdapter.removeOne(bookmark.id.toString(), state)
  ),
  on(BookmarksActions.createBookmark, (state, { bookmark }) =>
    bookmarksAdapter.addOne(bookmark, state)
  )
)

export function reducer(state: State | undefined, action: Action) {
  return bookmarksReducer(state, action);
}
