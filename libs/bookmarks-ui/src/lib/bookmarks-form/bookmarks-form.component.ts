import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookmarksFacade } from '@bookmarks-workspace/bookmarks-lib';

@Component({
  selector: 'bookmarks-workspace-bookmarks-form',
  templateUrl: './bookmarks-form.component.html',
  styleUrls: ['./bookmarks-form.component.scss']
})
export class BookmarksFormComponent implements OnInit {

  urlRegex = 'https?://?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  /**
   * The Angular FormGroup object that contains all FormControl objects.
   */
  bookmarkForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)])
  });

  /**
   * Error messages used in form validation.
   */
  errorMessage = 'You must enter a value';
  urlErrorMessage = 'You must enter a valid URL that begins with "http://"';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<BookmarksFormComponent>,
    private bookmarksFacade: BookmarksFacade
  ) {}

  /**
   * If a bookmark was passed, use the form to show bookmark details.
   * Else use the form for bookmark creation & use a new bookmark id.
   */
  ngOnInit(): void {

    if (this.data.bookmark) {
      this.bookmarkForm.setValue(this.data.bookmark);
      this.bookmarkForm.disable();
    } else {
      this.bookmarkForm.controls['id'].setValue(this.data.newId);
      this.bookmarkForm.controls['url'].setValue('http://');
    }
  }

  /**
   * Logic that is executed when the user closes the dialog.
   */
  close = () => this.dialogRef.close();

  /**
   * Logic that is executed when the user creates a bookmark.
   */
  create() {
    this.bookmarksFacade.createBookmark(this.bookmarkForm.value);
    this.close();
  }

  /**
   * Logic that is executed when the user deletes a bookmark.
   */
  delete() {
    this.bookmarksFacade.deleteBookmark(this.bookmarkForm.value);
    this.close();
  }
}
