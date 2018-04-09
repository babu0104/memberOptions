import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ViewAlertsInvalidsComponent } from './view-alerts-invalids.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http/src/http_module';
describe('ViewAlertsInvalidsComponent', () => {
  let component: ViewAlertsInvalidsComponent;
  let fixture: ComponentFixture<ViewAlertsInvalidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      // imports: [FormsModule,HttpModule],
      declarations: [ViewAlertsInvalidsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAlertsInvalidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
