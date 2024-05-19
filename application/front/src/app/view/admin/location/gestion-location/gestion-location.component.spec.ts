import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLocationComponent } from './gestion-location.component';

describe('GestionLocationComponent', () => {
  let component: GestionLocationComponent;
  let fixture: ComponentFixture<GestionLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
