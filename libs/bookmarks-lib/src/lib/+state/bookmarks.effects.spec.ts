import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { BookmarksEffects } from './bookmarks.effects';
import * as BookmarksActions from './bookmarks.actions';

describe('BookmarksEffects', () => {
  let actions: Observable<any>;
  let effects: BookmarksEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        BookmarksEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BookmarksEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BookmarksActions.init() });

      const expected = hot('-a-|', {
        a: BookmarksActions.loadBookmarksSuccess({ bookmarks: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
