import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRenduComponent } from './service-rendu.component';

describe('ServiceRenduComponent', () => {
  let component: ServiceRenduComponent;
  let fixture: ComponentFixture<ServiceRenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRenduComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
