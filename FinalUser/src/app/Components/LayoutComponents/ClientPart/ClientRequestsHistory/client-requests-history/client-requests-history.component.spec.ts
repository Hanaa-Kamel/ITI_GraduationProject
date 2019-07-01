import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRequestsHistoryComponent } from './client-requests-history.component';

describe('ClientRequestsHistoryComponent', () => {
  let component: ClientRequestsHistoryComponent;
  let fixture: ComponentFixture<ClientRequestsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRequestsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRequestsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
