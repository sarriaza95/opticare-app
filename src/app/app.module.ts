import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon"; // Opcional si usas iconos
import { UserProfileComponent } from "./user-profile/user-profile.component";

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
  ],
  declarations: [AppComponent, AdminLayoutComponent, UserProfileComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
