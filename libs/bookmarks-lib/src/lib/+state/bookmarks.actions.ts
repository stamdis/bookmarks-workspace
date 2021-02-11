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
