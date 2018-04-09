import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityLogComponent } from './security-log.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('SecurityLogComponent', () => {
  let component: SecurityLogComponent;
  let fixture: ComponentFixture<SecurityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SecurityLogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
