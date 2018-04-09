import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConnectionComponent } from './view-connection.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConnectionComponent', () => {
  let component: ViewConnectionComponent;
  let fixture: ComponentFixture<ViewConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ViewConnectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
