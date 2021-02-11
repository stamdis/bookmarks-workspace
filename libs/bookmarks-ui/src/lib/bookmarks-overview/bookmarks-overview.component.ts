import { Component, OnInit } from '@angular/core';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookmarksEntity, BookmarksFacade } from '@bookmarks-workspace/bookmarks-lib';
import { BookmarksFormComponent } from '../bookmarks-form/bookmarks-form.component';

interface Group {
  name: string;
  selected: boolean;
  groups?: Group[];
}

@Component({
  selector: 'bookmarks-workspace-bookmarks-overview',
  templateUrl: './bookmarks-overview.component.html',
  styleUrls: ['./bookmarks-overview.component.scss']
})
export class BookmarksOverviewComponent implements OnInit, AfterViewInit {

  dialogWidth = '35vw';

  data: BookmarksEntity[];

  group: Group = {
    name: 'All',
    selected: false,
    groups: []
  };

  allComplete: boolean = false;

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['id', 'name', 'group', 'url'];
  dataSource: MatTableDataSource<BookmarksEntity>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookmarksFacade: BookmarksFacade, private dialog: MatDialog) {

    this.dataSource = new MatTableDataSource([]);

    // Assign the data to the data source for the table to render
    bookmarksFacade.allBookmarks$.subscribe(x => {
      this.data = x;
      // STAMATIS: Find distinct groups
      const distinctGroups = [...new Set(this.data.map(bookmark => bookmark.group))];
      console.log(distinctGroups.map(group => ({ name: group, selected: true })));
      this.group.groups = distinctGroups.map(group => ({ name: group, selected: false }));
      this.setAll(true);
      // STAMATIS: Must filter x according to what user has selected
      const selectedGroups = this.getSelectedGroups();
      const filteredX = this.data.filter(bookmark => selectedGroups.includes(bookmark.group));
      this.dataSource.data = filteredX;
    });

    bookmarksFacade.init();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateAllComplete() {
    this.updateBasedOnGroups();

    this.allComplete = this.group.groups != null && this.group.groups.every(t => t.selected);
  }

  someComplete(): boolean {
    if (this.group.groups == null) {
      return false;
    }
    return this.group.groups.filter(t => t.selected).length > 0 && !this.allComplete;
  }

  setAll(selected: boolean) {
    this.allComplete = selected;
    if (this.group.groups == null) {
      return;
    }
    this.group.groups.forEach(t => t.selected = selected);
    // Stam
    this.updateBasedOnGroups();
  }

  /**
   * Helper method that returns the currently selected bookmark groups.
   */
  getSelectedGroups = () => this.group.groups.filter(x => x.selected).map(x => x.name);

  updateBasedOnGroups() {
    const selectedGroups = this.getSelectedGroups();
    const filteredX = this.data.filter(bookmark => selectedGroups.includes(bookmark.group));
    if (this.dataSource) {
      this.dataSource.data = filteredX;
    }
  }

  /**
   * Logic that is executed when the user wants to see bookmark details.
   * @param bookmark the bookmark entity for which details should be shown.
   */
  showBookmarkDetails(bookmark: BookmarksEntity) {
    this.dialog.open(BookmarksFormComponent, {
      width: this.dialogWidth,
      data: { bookmark }
    });
  }

  /**
   * Logic that is executed when the user wants to add a bookmark.
   * A new bookmark id is passed to the form.
   */
  addBookmark() {
    this.dialog.open(BookmarksFormComponent, {
      width: this.dialogWidth,
      data: { newId: this.findNewId(this.data) }
    });
  }

  /**
   * Logic that returns a new numeric id.
   * The maximum numeric id is found among the bookmark entities & is returned incremented by 1.
   * @param bookmarks the current bookmark entity collection.
   */
  findNewId = (bookmarks: BookmarksEntity[]) => (bookmarks.length > 0 ? Math.max(...bookmarks.map(bookmark => +bookmark.id)) : 0) + 1;
}
