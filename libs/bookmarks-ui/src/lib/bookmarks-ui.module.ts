import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksOverviewComponent } from './bookmarks-overview/bookmarks-overview.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BookmarksOverviewComponent],
  exports: [BookmarksOverviewComponent],
})
export class BookmarksUiModule {}
