import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientheaderComponent } from './clientheader.component';

describe('ClientheaderComponent', () => {
  let component: ClientheaderComponent;
  let fixture: ComponentFixture<ClientheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
