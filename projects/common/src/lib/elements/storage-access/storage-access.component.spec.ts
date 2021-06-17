import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageAccessComponent } from './storage-access.component';

describe('StorageAccessComponent', () => {
  let component: StorageAccessComponent;
  let fixture: ComponentFixture<StorageAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
