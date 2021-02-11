import { createAction, props } from '@ngrx/store';
import { BookmarksEntity } from './bookmarks.models';

export const init = createAction('[Bookmarks Page] Init');

export const loadBookmarksSuccess = createAction(
  '[Bookmarks/API] Load Bookmarks Success',
  props<{ bookmarks: BookmarksEntity[] }>()
);

export const loadBookmarksFailure = createAction(
  '[Bookmarks/API] Load Bookmarks Failure',
  props<{ error: any }>()
);

export const deleteBookmark = createAction(
  '[Bookmarks/API] Delete Bookmark',
  props<{ bookmark: BookmarksEntity }>()
);

export const createBookmark = createAction(
  '[Bookmarks/API] Create Bookmark',
  props<{ bookmark: BookmarksEntity }>()
);
