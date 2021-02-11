import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksOverviewComponent } from './bookmarks-overview.component';

describe('BookmarksOverviewComponent', () => {
  let component: BookmarksOverviewComponent;
  let fixture: ComponentFixture<BookmarksOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarksOverviewComponent ]
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
