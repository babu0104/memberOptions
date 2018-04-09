import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcsContactComponent } from './pcs-contact.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('PcsContactComponent', () => {
  let component: PcsContactComponent;
  let fixture: ComponentFixture<PcsContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PcsContactComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
