import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as BookmarksFeature from './bookmarks.reducer';
import * as BookmarksActions from './bookmarks.actions';
import { BookmarksEntity } from '@bookmarks-workspace/bookmarks-lib';

@Injectable()
export class BookmarksEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return BookmarksActions.loadBookmarksSuccess({ bookmarks: mockBookmarks });
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

export const mockBookmarks = [
  {
    id: 1,
    name: 'Google search engine',
    group: 'Leisure',
    url: 'http://www.google.com'
  },
  {
    id: 2,
    name: 'Avaloq',
    group: 'Work',
    url: 'https://www.avaloq.com'
  },
  {
    id: 3,
    name: 'Prodyna',
    group: 'Work',
    url: 'http://www.prodyna.de'
  },
  {
    id: 4,
    name: 'Greek news',
    group: 'Leisure',
    url: 'http://www.news.gr'
  },
  {
    id: 5,
    name: 'Github profile',
    group: 'Personal',
    url: 'https://github.com/stamdis'
  },
  {
    id: 6,
    name: 'Tesla',
    group: 'Leisure',
    url: 'https://www.tesla.com'
  }
];
