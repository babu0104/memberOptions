import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PcsAlertsInvalidsComponent } from './pcs-alerts-invalids.component';

describe('PcsAlertsInvalidsComponent', () => {
  let component: PcsAlertsInvalidsComponent;
  let fixture: ComponentFixture<PcsAlertsInvalidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PcsAlertsInvalidsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcsAlertsInvalidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
