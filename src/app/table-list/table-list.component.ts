import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'country', 'city', 'salary', 'details'];
  dataSource = new MatTableDataSource([
    { id: 1, name: 'Dakota Rice', country: 'Niger', city: 'Oud-Turnhout', salary: '$36,738' },
    { id: 2, name: 'Minerva Hooper', country: 'Curaçao', city: 'Sinaai-Waas', salary: '$23,789' },
    { id: 3, name: 'Sage Rodriguez', country: 'Netherlands', city: 'Baileux', salary: '$56,142' },
    { id: 4, name: 'Philip Chaney', country: 'Korea, South', city: 'Overland Park', salary: '$38,735' },
    { id: 5, name: 'Doris Greene', country: 'Malawi', city: 'Feldkirchen', salary: '$63,542' },
    { id: 6, name: 'Mason Porter', country: 'Chile', city: 'Gloucester', salary: '$78,615' },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
}
