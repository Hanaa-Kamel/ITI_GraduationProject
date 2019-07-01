import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonfinshedRequstComponent } from './nonfinshed-requst.component';

describe('NonfinshedRequstComponent', () => {
  let component: NonfinshedRequstComponent;
  let fixture: ComponentFixture<NonfinshedRequstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonfinshedRequstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonfinshedRequstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
