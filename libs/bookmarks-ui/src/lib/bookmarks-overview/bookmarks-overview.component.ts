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

  parentGroup: Group = {
    name: 'All',
    selected: true,
    groups: []
  };

  displayedColumns: string[] = ['id', 'name', 'group', 'url'];
  dataSource: MatTableDataSource<BookmarksEntity> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookmarksFacade: BookmarksFacade, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Define the logic upon bookmark state changes.
    this.bookmarksFacade.allBookmarks$.subscribe(newBookmarks => {
      // Store the data so we can do the group filtering inside the component.
      this.data = newBookmarks;
      // Update group selector checkboxes (new bookmark groups might get introduced).
      this.parentGroup.groups = this.updateGroupSelectorCheckboxes(this.data, this.parentGroup);
      // Update the Angular Material table component with the filtered (by group selector) data.
      this.dataSource.data = this.data.filter(bookmark => this.getSelectedGroups(this.parentGroup).includes(bookmark.group));
    });

    // Initialize the bookmark state
    this.bookmarksFacade.init();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Logic that returns an array of distinct bookmarks groups.
   * @param bookmarks the bookmark collection.
   */
  findDistinctGroups = (bookmarks: BookmarksEntity[]) => [...new Set(bookmarks.map(bookmark => bookmark.group))];

  /**
   * Logic that returns the currently selected bookmark groups.
   * @param parentGroup the parent checkbox model.
   */
  getSelectedGroups = (parentGroup: Group) => parentGroup.groups.filter(x => x.selected).map(x => x.name);

  /**
   * Logic that updates the component bookmark data according to new bookmarks and/or group selector state.
   * @param bookmarks the bookmark collection.
   * @param parentGroup the parent checkbox model.
   */
  updateData(bookmarks: BookmarksEntity[], parentGroup: Group) {
    const selectedGroups = this.getSelectedGroups(parentGroup);
    return bookmarks.filter(bookmark => selectedGroups.includes(bookmark.group));
  }

  /**
   * Logic that updates the available group selector checkboxes & returns an updated collection.
   * @param bookmarks the bookmark collection.
   * @param parentGroup the parent checkbox model.
   */
  updateGroupSelectorCheckboxes(bookmarks: BookmarksEntity[], parentGroup: Group): Group[] {
    const currentGroups = parentGroup.groups.map(group => group.name);
    const newDistinctGroups = this.findDistinctGroups(bookmarks).filter(group => !currentGroups.includes(group));
    const newGroups = newDistinctGroups.map(group => ({ name: group, selected: parentGroup.selected || this.areSomeGroupsSelected(parentGroup) }));
    return parentGroup.groups.concat(newGroups);
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

  /**
   * Logic that ensures that no bookmark details are shown in case the bookmark link was pressed.
   * @param event the link click event.
   */
  linkClick = (event: MouseEvent) => event.stopPropagation();

  /**
   * Logic that is used when the user makes a search for his bookmarks through the user interface.
   * @param event the keyboard event.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Logic that updates the data & any necessary checkbox state.
   * Executed when the user clicks on any group selector in the user interface.
   */
  onCheckboxChange() {
    this.dataSource.data = this.updateData(this.data, this.parentGroup);
    this.parentGroup.selected = this.parentGroup.groups != null && this.parentGroup.groups.every(t => t.selected);
  }

  /**
   * Logic that returns true if at least one group checkbox is selected.
   * @param parentGroup the parent checkbox model.
   */
  areSomeGroupsSelected(parentGroup: Group): boolean {
    if (parentGroup.groups == null) {
      return false;
    }
    return parentGroup.groups.filter(t => t.selected).length > 0 && !parentGroup.selected;
  }

  /**
   * Logic that updates the data & any necessary checkbox state.
   * Executed when the user clicks on the 'All' group selector in the user interface.
   * @param selected the value of the checkbox.
   */
  onAllCheckboxChange(selected: boolean) {
    this.parentGroup.selected = selected;
    if (this.parentGroup.groups == null) {
      return;
    }
    this.parentGroup.groups.forEach(t => t.selected = selected);
    this.dataSource.data = this.updateData(this.data, this.parentGroup);
  }
}
