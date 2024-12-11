import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerExpedienteClienteComponent } from './dialog-ver-expediente-cliente.component';

describe('DialogVerExpedienteClienteComponent', () => {
  let component: DialogVerExpedienteClienteComponent;
  let fixture: ComponentFixture<DialogVerExpedienteClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVerExpedienteClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVerExpedienteClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
