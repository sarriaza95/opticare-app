import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { TableListComponent } from "./table-list/table-list.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon"; // Opcional si usas iconos
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';
import { DialogEditarClienteComponent } from './dialog-editar-cliente/dialog-editar-cliente.component';
import { DialogAgregarCitaClienteComponent } from './dialog-agregar-cita-cliente/dialog-agregar-cita-cliente.component';
import { DialogVerConsultaClienteComponent } from './dialog-ver-consulta-cliente/dialog-ver-consulta-cliente.component';
import { DialogVerExpedienteClienteComponent } from './dialog-ver-expediente-cliente/dialog-ver-expediente-cliente.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatStepperModule, // Importar Stepper
    MatButtonModule, // Botones
    MatInputModule, // Inputs
    MatIconModule, // Opcional, para iconos
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent, UserProfileComponent, TableListComponent, DetalleClienteComponent, DialogEditarClienteComponent, DialogAgregarCitaClienteComponent, DialogVerConsultaClienteComponent, DialogVerExpedienteClienteComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
