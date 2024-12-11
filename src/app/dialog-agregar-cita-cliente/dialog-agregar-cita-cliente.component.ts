import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-agregar-cita-cliente',
  templateUrl: './dialog-agregar-cita-cliente.component.html',
  styleUrls: ['./dialog-agregar-cita-cliente.component.scss']
})
export class DialogAgregarCitaClienteComponent implements OnInit {
  mainForm: FormGroup; // Formulario principal
  hoy: string = new Date().toISOString().substring(0, 10); // Fecha actual
  odImages: File[] = [];
  oiImages: File[] = [];
  odVideos: File[] = [];
  oiVideos: File[] = [];
  expediente_id: number = 0;
  lensometriaData = [
    { ojo: "OD", esf: "", cil: "", eje: "" },
    { ojo: "OI", esf: "", cil: "", eje: "" },
  ];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private dialogRef: MatDialogRef<DialogAgregarCitaClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.mainForm = this.fb.group({
      antecedentes: this.fb.group({
        personales: [""],
        oculares: [""],
      }),
      lensometria: this.fb.group({
        od: this.fb.group({
          esf: [''],
          cil: [''],
          eje: ['']
        }),
        oi: this.fb.group({
          esf: [''],
          cil: [''],
          eje: ['']
        }),
        add: ['']
      }),
      tipoLentes: this.fb.group({
        tipoLentes: [""]
      }),
      examenObjetivo: this.fb.group({
        od: this.fb.group({
          esf: [''],
          cil: [''],
          eje: [''],
          avsc: [''],
        }),
        oi: this.fb.group({
          esf: [''],
          cil: [''],
          eje: [''],
          avsc: [''],
        }),
      }),
      rxFinal: this.fb.group({
        od: this.fb.group({
          esf: [''],
          cil: [''],
          eje: [''],
          avl: [''], // Agudeza visual lejana
          avc: [''], // Agudeza visual cercana
          dnp: [''], // Distancia naso-pupilar
          alt: [''], // Altura
        }),
        oi: this.fb.group({
          esf: [''],
          cil: [''],
          eje: [''],
          avl: [''],
          avc: [''],
          dnp: [''],
          alt: [''],
        }),
        add: [''], // Adición
      }),
      biomicroscopia: this.fb.group({
        od: this.fb.group({
          images: [[]], // Lista de imágenes para OD
          videos: [[]], // Lista de videos para OD
        }),
        oi: this.fb.group({
          images: [[]], // Lista de imágenes para OI
          videos: [[]], // Lista de videos para OI
        }),
      }),
      fondoOjo: this.fb.group({
        od: [''], // Campo para ojo derecho
        oi: ['']  // Campo para ojo izquierdo
      }),
      motilidadOcular: this.fb.group({
        od: [''], // Campo para ojo derecho
        oi: [''], // Campo para ojo izquierdo
        ao: ['']  // Campo para ambos ojos
      }),
      coverTest: this.fb.group({
        odVl: [''], // Campo para ojo derecho - VL
        odVp: [''], // Campo para ojo derecho - VP
        oiVl: [''], // Campo para ojo izquierdo - VL
        oiVp: ['']  // Campo para ojo izquierdo - VP
      }),
      pio: this.fb.group({
        odPio: [''], // Campo para PIO ojo derecho
        oiPio: ['']  // Campo para PIO ojo izquierdo
      }),
      diagnostico: this.fb.group({
        diagnostico: [''],
        tiposLentes: [''],
        proximaCita: [null],
        observaciones: ['']
      }),
      datosMontaje: this.fb.group({
        odH: [''], // Campo para la medida H en el ojo derecho
        odV: [''], // Campo para la medida V en el ojo derecho
        oiH: [''], // Campo para la medida H en el ojo izquierdo
        oiV: [''] // Campo para la medida V en el ojo izquierdo
      }),
      queratometria: this.fb.group({
        odKeratometria: [''], // Campo para la queratometría del ojo derecho
        oiKeratometria: [''], // Campo para la queratometría del ojo izquierdo
      }),
      observaciones: this.fb.group({
        observaciones: [''], // Campo para Observaciones
      }),
    });
  }
  // Capturar imágenes
onFileSelect(eye: 'od' | 'oi', event: Event): void {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    const fileArray = Array.from(files); // Convertimos FileList a Array
    if ((event.target as HTMLInputElement).accept?.includes('image')) {
      if (eye === 'od') {
        this.odImages = fileArray; // Almacenar imágenes OD
      } else if (eye === 'oi') {
        this.oiImages = fileArray; // Almacenar imágenes OI
      }
    } else if ((event.target as HTMLInputElement).accept?.includes('video')) {
      if (eye === 'od') {
        this.odVideos = fileArray; // Almacenar videos OD
      } else if (eye === 'oi') {
        this.oiVideos = fileArray; // Almacenar videos OI
      }
    }
  }
}
  

  
  submitForm() {
    console.log(this.mainForm.value);
    const biomicroscopiaData = this.mainForm.get('biomicroscopia')?.value;
    console.log(biomicroscopiaData)
    const formData = new FormData();

    this.odImages.forEach(file => formData.append('odImages', file));
    this.odVideos.forEach(file => formData.append('odVideos', file));
    this.oiImages.forEach(file => formData.append('oiImages', file));
    this.oiVideos.forEach(file => formData.append('oiVideos', file));

    // Enviar la solicitud HTTP al servidor
    
    const body = this.mainForm.value;

    this.http.post(`http://localhost:3000/api/save-form-cita/${this.data.cliente_id}`, body).subscribe({
      next: (response: any) => {
        // Manejar la respuesta exitosa
        console.log('Respuesta exitosa:', response);

        // Extraer los valores de la respuesta
        const message = response.message;
        const expedienteId = response.expedienteId;

        // Mostrar mensaje o realizar acciones con los datos
        console.log(`Mensaje: ${message}`);
        console.log(`Expediente ID: ${expedienteId}`);
        formData.append('expediente_id', expedienteId.toString());
        this.http.post('http://localhost:3000/api/upload-files', formData).subscribe(
          (response: any) => {
            // Manejar la respuesta del servidor
            console.log('Respuesta del servidor:', response);
            Swal.fire({
              title: '¡Éxito!',
              text: 'Los datos se han guardado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              this.dialogRef.close();
              // Redirigir a la URL
              this.router.navigate(['/table-list']);
            });
    
          },
          (error: any) => {
            // Manejar el error
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al guardar los datos. Intenta nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
            console.error('Error al enviar archivos al servidor', error);
          }
        );

      },
      error: (error: any) => {
        // Manejar el error en la solicitud
        console.error('Error en el guardado:', error);
      },
    });
  } 

}
