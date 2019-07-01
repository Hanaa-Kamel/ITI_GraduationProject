import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSayFinishedComponent } from './client-say-finished.component';

describe('ClientSayFinishedComponent', () => {
  let component: ClientSayFinishedComponent;
  let fixture: ComponentFixture<ClientSayFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSayFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSayFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
