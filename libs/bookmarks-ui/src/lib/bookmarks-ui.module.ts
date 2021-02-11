import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@bookmarks-workspace/angular-material';
import { BookmarksOverviewComponent } from './bookmarks-overview/bookmarks-overview.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookmarksLibModule } from '@bookmarks-workspace/bookmarks-lib';
import { BookmarksFormComponent } from './bookmarks-form/bookmarks-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BookmarksLibModule,
    FlexLayoutModule
  ],
  declarations: [BookmarksOverviewComponent, BookmarksFormComponent],
  exports: [BookmarksOverviewComponent, BookmarksFormComponent],
})
export class BookmarksUiModule {}
