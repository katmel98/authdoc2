import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsListItemComponent } from './docs-list-item.component';

describe('DocsListItemComponent', () => {
  let component: DocsListItemComponent;
  let fixture: ComponentFixture<DocsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
