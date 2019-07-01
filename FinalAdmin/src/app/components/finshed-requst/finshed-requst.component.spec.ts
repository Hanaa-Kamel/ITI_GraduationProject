import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinshedRequstComponent } from './finshed-requst.component';

describe('FinshedRequstComponent', () => {
  let component: FinshedRequstComponent;
  let fixture: ComponentFixture<FinshedRequstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinshedRequstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinshedRequstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
