import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ApplicationVelocityComponent } from './application-velocity.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
describe('ApplicationVelocityComponent', () => {
  let component: ApplicationVelocityComponent;
  let fixture: ComponentFixture<ApplicationVelocityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, HttpModule],
      declarations: [ApplicationVelocityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationVelocityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
