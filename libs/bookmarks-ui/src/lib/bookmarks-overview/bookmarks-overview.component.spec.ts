import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { BookmarksFacade } from '@bookmarks-workspace/bookmarks-lib';
import { AngularMaterialModule } from '@bookmarks-workspace/angular-material';
import { BookmarksOverviewComponent } from './bookmarks-overview.component';

describe('BookmarksOverviewComponent', () => {
  let component: BookmarksOverviewComponent;
  let fixture: ComponentFixture<BookmarksOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarksOverviewComponent],
      imports: [BrowserAnimationsModule, FormsModule, AngularMaterialModule],
      providers: [BookmarksFacade, provideMockStore({ initialState: {} })]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
