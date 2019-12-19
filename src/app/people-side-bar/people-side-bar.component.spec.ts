import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSideBarComponent } from './people-side-bar.component';

describe('PeopleSideBarComponent', () => {
  let component: PeopleSideBarComponent;
  let fixture: ComponentFixture<PeopleSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
