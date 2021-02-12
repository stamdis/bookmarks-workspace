import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialModule } from '@bookmarks-workspace/angular-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { BookmarksFacade, BookmarksLibModule } from '@bookmarks-workspace/bookmarks-lib';
import { BookmarksFormComponent } from './bookmarks-form.component';

describe('BookmarksFormComponent', () => {
  let component: BookmarksFormComponent;
  let fixture: ComponentFixture<BookmarksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarksFormComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, AngularMaterialModule, StoreModule.forRoot({})],
      providers: [BookmarksFacade, { provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: { close: () => {} } }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
