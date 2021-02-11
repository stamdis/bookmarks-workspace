import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBookmarks from './+state/bookmarks.reducer';
import { BookmarksEffects } from './+state/bookmarks.effects';
import { BookmarksFacade } from './+state/bookmarks.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromBookmarks.BOOKMARKS_FEATURE_KEY,
      fromBookmarks.reducer
    ),
    EffectsModule.forFeature([BookmarksEffects]),
  ],
  providers: [BookmarksFacade],
})
export class BookmarksLibModule {}
