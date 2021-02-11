import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as BookmarksActions from './bookmarks.actions';
import { BookmarksEntity } from './bookmarks.models';
import * as BookmarksFeature from './bookmarks.reducer';
import * as BookmarksSelectors from './bookmarks.selectors';

@Injectable()
export class BookmarksFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(BookmarksSelectors.getBookmarksLoaded));
  allBookmarks$ = this.store.pipe(select(BookmarksSelectors.getAllBookmarks));
  selectedBookmarks$ = this.store.pipe(select(BookmarksSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(BookmarksActions.init());
  }

  deleteBookmark(bookmark: BookmarksEntity) {
    this.store.dispatch(BookmarksActions.deleteBookmark({ bookmark }));
  }

  createBookmark(bookmark: BookmarksEntity) {
    this.store.dispatch(BookmarksActions.createBookmark({ bookmark }));
  }
}
