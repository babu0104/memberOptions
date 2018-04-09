import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewThresholdComponent } from './view-threshold.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('ThresholdComponent', () => {
  let component: ViewThresholdComponent;
  let fixture: ComponentFixture<ViewThresholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ViewThresholdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
