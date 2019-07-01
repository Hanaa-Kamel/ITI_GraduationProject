import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFinishedRequestsComponent } from './all-finished-requests.component';

describe('AllFinishedRequestsComponent', () => {
  let component: AllFinishedRequestsComponent;
  let fixture: ComponentFixture<AllFinishedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFinishedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFinishedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
