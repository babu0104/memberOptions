import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChangeAssociationComponent } from './change-association.component';
import { HttpModule } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('ChangeAssociationComponent', () => {
  let component: ChangeAssociationComponent;
  let fixture: ComponentFixture<ChangeAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, HttpModule],
      declarations: [ChangeAssociationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(' Change Association component has been created', () => {
    expect(component).toBeTruthy();
  });
});
