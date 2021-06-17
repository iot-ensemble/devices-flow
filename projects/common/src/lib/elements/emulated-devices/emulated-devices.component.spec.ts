import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmulatedDevicesComponent } from './emulated-devices.component';

describe('EmulatedDevicesComponent', () => {
  let component: EmulatedDevicesComponent;
  let fixture: ComponentFixture<EmulatedDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmulatedDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmulatedDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
