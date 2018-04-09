import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcsHeirarchyComponent } from './pcs-heirarchy.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('PcsHeirarchyComponent', () => {
  let component: PcsHeirarchyComponent;
  let fixture: ComponentFixture<PcsHeirarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PcsHeirarchyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcsHeirarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
