import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  mainForm: FormGroup; // Formulario principal
  hoy: string = new Date().toISOString().substring(0, 10); // Fecha actual

  lensometriaData = [
    { ojo: "OD", esf: "", cil: "", eje: "" },
    { ojo: "OI", esf: "", cil: "", eje: "" },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.mainForm = this.fb.group({
      personalInfo: this.fb.group({
        nombre: [""],
        fecha: [this.hoy],
        fechaNacimiento: [""],
        ultimaConsulta: [""],
        edad: [""],
        contacto: [""],
        ocupacion: [""],
        motivo: [""],
      }),
      antecedentes: this.fb.group({
        personales: [""],
        oculares: [""],
      }),
      lensometria: this.fb.group({
        esf: [""],
        cil: [""],
        eje: [""],
      }),
      observaciones: [""],
    });
  }

  submitForm() {
    console.log(this.mainForm.value);
  }
}
