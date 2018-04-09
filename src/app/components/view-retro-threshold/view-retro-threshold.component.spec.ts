import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRetroThresholdComponent } from './view-retro-threshold.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('ViewRetroThresholdComponent', () => {
  let component: ViewRetroThresholdComponent;
  let fixture: ComponentFixture<ViewRetroThresholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ViewRetroThresholdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRetroThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
