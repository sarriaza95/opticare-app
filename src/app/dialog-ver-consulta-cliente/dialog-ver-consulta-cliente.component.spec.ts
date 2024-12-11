import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerConsultaClienteComponent } from './dialog-ver-consulta-cliente.component';

describe('DialogVerConsultaClienteComponent', () => {
  let component: DialogVerConsultaClienteComponent;
  let fixture: ComponentFixture<DialogVerConsultaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVerConsultaClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVerConsultaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
