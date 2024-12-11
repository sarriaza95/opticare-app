import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DetalleClienteComponent } from '../detalle-cliente/detalle-cliente.component'; // Ajusta la ruta si es necesario
import { DialogEditarClienteComponent } from 'app/dialog-editar-cliente/dialog-editar-cliente.component';
import { DialogAgregarCitaClienteComponent } from 'app/dialog-agregar-cita-cliente/dialog-agregar-cita-cliente.component';
import { DialogVerConsultaClienteComponent } from 'app/dialog-ver-consulta-cliente/dialog-ver-consulta-cliente.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'fecha', 'edad', 'ultima_consulta', 'contacto', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  clienteSeleccionado: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cargarClientes();
  }
  cargarClientes(): void {
    this.http.get<any>('http://localhost:3000/api/clientes').subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
      },
      error: (error) => {
        console.error('Error al cargar los datos de clientes:', error);
      },
    });
  }

  verDetalle(cliente: any): void {
    this.dialog.open(DetalleClienteComponent, {
      data: cliente,
      width: '400px', // Puedes ajustar el tamaño del modal si es necesario
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
    XLSX.writeFile(workbook, 'clientes.xlsx');
  }

  openDetails(element: any) {
    alert(`Detalles del cliente:\nNombre: ${element.name}\nPaís: ${element.country}`);
    // Aquí puedes abrir un modal para mostrar información detallada.
  }
  editarCliente(cliente: any): void {
    const dialogRef = this.dialog.open(DialogEditarClienteComponent, {
      width: '400px',
      data: { ...cliente },
    });
  
    dialogRef.afterClosed().subscribe(result => {
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
    });
  }
  agregarCita(cliente: any): void {
    const dialogRef = this.dialog.open(DialogAgregarCitaClienteComponent, {
      width: '1000px',
      maxHeight: '90vh',
      data: { ...cliente },
    });
  
    dialogRef.afterClosed().subscribe(result => {
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
    });
  }
  verConsultas(cliente: any): void {
    const dialogRef = this.dialog.open(DialogVerConsultaClienteComponent, {
      width: '1000px',
      maxHeight: '90vh',
      data: { ...cliente },
    });
  
    dialogRef.afterClosed().subscribe(result => {
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
    });
  }
}
// Componente para el diálogo del modal
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'dialog-detalle-cliente',
  template: `
    <h2>Detalle del Cliente</h2>
    <p><strong>Nombre:</strong> {{ data.nombre }}</p>
    <p><strong>Fecha:</strong> {{ data.fecha }}</p>
    <p><strong>Edad:</strong> {{ data.edad }}</p>
    <p><strong>Última Consulta:</strong> {{ data.ultima_consulta }}</p>
    <p><strong>Contacto:</strong> {{ data.contacto }}</p>
    <button mat-button mat-dialog-close>Cerrar</button>
  `,
})
export class DialogDetalleClienteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
