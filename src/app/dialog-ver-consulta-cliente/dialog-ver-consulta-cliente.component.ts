import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogVerExpedienteClienteComponent } from 'app/dialog-ver-expediente-cliente/dialog-ver-expediente-cliente.component';

@Component({
  selector: 'app-dialog-ver-consulta-cliente',
  templateUrl: './dialog-ver-consulta-cliente.component.html',
  styleUrls: ['./dialog-ver-consulta-cliente.component.scss']
})
export class DialogVerConsultaClienteComponent implements OnInit {
  expedientes: any[] = [];
  clienteId: number = 1; // Cambia según el cliente seleccionado
  displayedColumns: string[] = ['expedienteId', 'fechaCreacion', 'acciones'];


  constructor(
    public dialogRef: MatDialogRef<DialogVerConsultaClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerExpedientes();
  }
  async obtenerExpedientes(): Promise<void> {
    console.log(this.data.cliente_id)
    const apiUrl = `http://localhost:3000/api/expedientes/${this.data.cliente_id}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error al obtener los expedientes');
      }
      this.expedientes = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  verMas(expediente: any): void {
    console.log('Expediente seleccionado:', expediente);
    // Implementa lógica adicional para el botón "Ver más"
    const dialogRef = this.dialog.open(DialogVerExpedienteClienteComponent, {
      width: '1000px',
      maxHeight: '90vh',
      data: { ...expediente },
    });
  }
  cerrar(): void {
    this.dialogRef.close();
  }
  verConsultas(expediente: any): void {
    const dialogRef = this.dialog.open(DialogVerExpedienteClienteComponent, {
      width: '1000px',
      maxHeight: '90vh',
      data: { ...expediente },
    });
  
    /* dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes recargar los datos o manejar la respuesta
        Swal.fire({
          title: '¡Éxito!',
          text: 'Los datos se han guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.cargarClientes();
        });
        
      }
    }); */
  }
}
