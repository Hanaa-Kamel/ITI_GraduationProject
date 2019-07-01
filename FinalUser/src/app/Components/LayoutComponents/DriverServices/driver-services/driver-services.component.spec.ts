import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverServicesComponent } from './driver-services.component';

describe('DriverServicesComponent', () => {
  let component: DriverServicesComponent;
  let fixture: ComponentFixture<DriverServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
