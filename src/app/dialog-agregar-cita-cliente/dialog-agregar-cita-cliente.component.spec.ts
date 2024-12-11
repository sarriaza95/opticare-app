import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgregarCitaClienteComponent } from './dialog-agregar-cita-cliente.component';

describe('DialogAgregarCitaClienteComponent', () => {
  let component: DialogAgregarCitaClienteComponent;
  let fixture: ComponentFixture<DialogAgregarCitaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAgregarCitaClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAgregarCitaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
