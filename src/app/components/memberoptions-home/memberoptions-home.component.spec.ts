import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberOptionsHomeComponent } from './memberoptions-home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MemberOptionsHomeComponent', () => {
  let component: MemberOptionsHomeComponent;
  let fixture: ComponentFixture<MemberOptionsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MemberOptionsHomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberOptionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
