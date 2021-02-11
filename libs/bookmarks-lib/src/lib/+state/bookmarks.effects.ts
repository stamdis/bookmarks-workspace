import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as BookmarksFeature from './bookmarks.reducer';
import * as BookmarksActions from './bookmarks.actions';

@Injectable()
export class BookmarksEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return BookmarksActions.loadBookmarksSuccess({ bookmarks: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return BookmarksActions.loadBookmarksFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
