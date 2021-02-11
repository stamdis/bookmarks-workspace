import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@bookmarks-workspace/angular-material';
import { BookmarksOverviewComponent } from './bookmarks-overview/bookmarks-overview.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookmarksLibModule } from '@bookmarks-workspace/bookmarks-lib';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    BookmarksLibModule
  ],
  declarations: [BookmarksOverviewComponent],
  exports: [BookmarksOverviewComponent],
})
export class BookmarksUiModule {}
