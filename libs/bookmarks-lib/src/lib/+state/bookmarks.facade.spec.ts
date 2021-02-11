import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { BookmarksEntity } from './bookmarks.models';
import { BookmarksEffects } from './bookmarks.effects';
import { BookmarksFacade } from './bookmarks.facade';

import * as BookmarksSelectors from './bookmarks.selectors';
import * as BookmarksActions from './bookmarks.actions';
import {
  BOOKMARKS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './bookmarks.reducer';

interface TestSchema {
  bookmarks: State;
}

describe('BookmarksFacade', () => {
  let facade: BookmarksFacade;
  let store: Store<TestSchema>;
  const createBookmarksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BookmarksEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BOOKMARKS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([BookmarksEffects]),
        ],
        providers: [BookmarksFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(BookmarksFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allBookmarks$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allBookmarks$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadBookmarksSuccess` to manually update list
     */
    it('allBookmarks$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allBookmarks$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          BookmarksActions.loadBookmarksSuccess({
            bookmarks: [
              createBookmarksEntity('AAA'),
              createBookmarksEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allBookmarks$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
