import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-editar-cliente',
  templateUrl: './dialog-editar-cliente.component.html',
  styleUrls: ['./dialog-editar-cliente.component.scss']
})
export class DialogEditarClienteComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<DialogEditarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formulario = this.fb.group({
      nombre: [data.nombre, [Validators.required]],
      fecha: [data.fecha, [Validators.required]],
      edad: [data.edad, [Validators.required, Validators.min(0)]],
      ultima_consulta: [data.ultima_consulta, [Validators.required]],
      contacto: [data.contacto, [Validators.required]],
      ocupacion: [data.ocupacion, [Validators.required]]
    });
  }

  guardarCambios(): void {
    if (this.formulario.valid) {
      const clienteActualizado = this.formulario.value;
      this.http.put(`http://localhost:3000/api/clientes/${this.data.cliente_id}`, clienteActualizado).subscribe({
        next: () => {
          console.log('Cliente actualizado exitosamente');
          this.dialogRef.close(true); // Cierra el modal y notifica al componente padre
        },
        error: (err) => {
          console.error('Error al actualizar el cliente:', err);
        }
      });
    }
  }
}
