import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GroupAdministrationComponent } from './group-administration.component';

describe('GroupAdministrationComponent', () => {
  let component: GroupAdministrationComponent;
  let fixture: ComponentFixture<GroupAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [GroupAdministrationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should be created', () => {
     expect(component).toBeTruthy();
   });*/
});
