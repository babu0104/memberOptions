import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AlertsInvalidsComponent } from './alerts-invalids.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

describe('AlertsInvalidsComponent', () => {
  let component: AlertsInvalidsComponent;
  let fixture: ComponentFixture<AlertsInvalidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, HttpModule],
      declarations: [AlertsInvalidsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsInvalidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Alert Component has been created', () => {
    expect(component).toBeTruthy();
  });
});
