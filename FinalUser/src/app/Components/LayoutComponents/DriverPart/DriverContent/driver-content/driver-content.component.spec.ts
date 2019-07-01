import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverContentComponent } from './driver-content.component';

describe('DriverContentComponent', () => {
  let component: DriverContentComponent;
  let fixture: ComponentFixture<DriverContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
