import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAllNotFinshedRequestsComponent } from './driver-all-not-finshed-requests.component';

describe('DriverAllNotFinshedRequestsComponent', () => {
  let component: DriverAllNotFinshedRequestsComponent;
  let fixture: ComponentFixture<DriverAllNotFinshedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverAllNotFinshedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverAllNotFinshedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
