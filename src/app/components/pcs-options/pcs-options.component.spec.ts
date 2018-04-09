import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcsOptionsComponent } from './pcs-options.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('OptionsComponent', () => {
  let component: PcsOptionsComponent;
  let fixture: ComponentFixture<PcsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PcsOptionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should be created', () => {
     expect(component).toBeTruthy();
   });*/
});
