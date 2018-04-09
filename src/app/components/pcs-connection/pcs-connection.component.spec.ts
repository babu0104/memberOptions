import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcsConnectionComponent } from './pcs-connection.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('PcsConnectionComponent', () => {
  let component: PcsConnectionComponent;
  let fixture: ComponentFixture<PcsConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PcsConnectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcsConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
