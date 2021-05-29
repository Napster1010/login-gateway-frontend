import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationQrComponent } from './registration-qr.component';

describe('RegistrationQrComponent', () => {
  let component: RegistrationQrComponent;
  let fixture: ComponentFixture<RegistrationQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
