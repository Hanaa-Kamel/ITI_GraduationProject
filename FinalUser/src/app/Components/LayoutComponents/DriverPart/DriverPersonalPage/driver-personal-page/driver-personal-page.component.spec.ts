import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPersonalPageComponent } from './driver-personal-page.component';

describe('DriverPersonalPageComponent', () => {
  let component: DriverPersonalPageComponent;
  let fixture: ComponentFixture<DriverPersonalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverPersonalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverPersonalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
