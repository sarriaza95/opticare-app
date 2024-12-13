import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ver-expediente-cliente',
  templateUrl: './dialog-ver-expediente-cliente.component.html',
  styleUrls: ['./dialog-ver-expediente-cliente.component.scss']
})
export class DialogVerExpedienteClienteComponent implements OnInit {
  mainForm: FormGroup; // Formulario principal
  hoy: string = new Date().toISOString().substring(0, 10); // Fecha actual
  expediente_id: number = 0; // ID del expediente recibido
  apiUrl = 'http://localhost:3000/api'; // URL base de la API
  biomicroscopiaData = {
    od_images: [] as string[],
    oi_images: [] as string[],
    od_videos: [] as string[],
    oi_videos: [] as string[],
  };
  odImages: string[] = [];
  oiVideos: string[] = [];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { expediente_id: number }, // Recibe datos del diálogo
    private dialogRef: MatDialogRef<DialogVerExpedienteClienteComponent>
  ) {
    this.expediente_id = data.expediente_id; // Asigna el expediente_id recibido
  }

  ngOnInit(): void {
    this.initializeForm();

    // Cargar los datos del expediente
    this.loadExpedienteData();
    this.cargarBiomicroscopia();
  }

  private initializeForm(): void {
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
          avl: [''],
          avc: [''],
          dnp: [''],
          alt: [''],
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
        add: [''],
      }),
      biomicroscopia: this.fb.group({
        od: this.fb.group({
          images: [[]],
          videos: [[]],
        }),
        oi: this.fb.group({
          images: [[]],
          videos: [[]],
        }),
      }),
      fondoOjo: this.fb.group({
        od: [''],
        oi: ['']
      }),
      motilidadOcular: this.fb.group({
        od: [''],
        oi: [''],
        ao: ['']
      }),
      coverTest: this.fb.group({
        odVl: [''],
        odVp: [''],
        oiVl: [''],
        oiVp: ['']
      }),
      pio: this.fb.group({
        odPio: [''],
        oiPio: ['']
      }),
      diagnostico: this.fb.group({
        diagnostico: [''],
        tiposLentes: [''],
        proximaCita: [null],
        observaciones: ['']
      }),
      datosMontaje: this.fb.group({
        odH: [''],
        odV: [''],
        oiH: [''],
        oiV: ['']
      }),
      queratometria: this.fb.group({
        odKeratometria: [''],
        oiKeratometria: [''],
      }),
      observaciones: this.fb.group({
        observaciones: [''],
      }),
    });
  }

  private loadExpedienteData(): void {
    this.http.get(`${this.apiUrl}/expedientes-detalle/${this.expediente_id}`)
      .subscribe({
        next: (response: any) => {
          this.fillForm(response);
        },
        error: (error) => {
          console.error('Error al cargar el expediente:', error);
          Swal.fire('Error', 'No se pudo cargar el expediente.', 'error');
        }
      });
  }
  cargarBiomicroscopia(): void {
    this.http.get<any>(`http://localhost:3000/api/biomicroscopia/${this.expediente_id}`).subscribe({
      next: (data) => {
        // Ajustar las URLs para mostrar las miniaturas
        this.odImages = (data.od_images || []).map((file: string) => `http://localhost:3000/uploads/${file}`);
        this.oiVideos = (data.oi_videos || []).map((file: string) => `http://localhost:3000/uploads/${file}`);
      },
      error: (err) => {
        console.error('Error cargando biomicroscopia:', err);
      },
    });
  }

  private fillForm(data: any): void {
    console.log(data);
  
    // Antecedentes
    const antecedentes = data.antecedentes?.[0] || {};
    this.mainForm.get('antecedentes')?.patchValue({
      personales: antecedentes.personales || "",
      oculares: antecedentes.oculares || ""
    });
  
    // Lensometría
    const lensometria = data.lensometria?.[0] || {};
    this.mainForm.get('lensometria')?.patchValue({
      od: {
        esf: lensometria.od_esf || "",
        cil: lensometria.od_cil || "",
        eje: lensometria.od_eje || ""
      },
      oi: {
        esf: lensometria.oi_esf || "",
        cil: lensometria.oi_cil || "",
        eje: lensometria.oi_eje || ""
      },
      add: lensometria.add || ""
    });
  
    // Tipo de lentes
    const tipoLentes = data.tipoLentes?.[0] || {};
    this.mainForm.get('tipoLentes')?.patchValue({
      tipoLentes: tipoLentes.tipo_lentes || ""
    });
  
    // Examen Objetivo
    const examenObjetivo = data.examenObjetivo?.[0] || {};
    this.mainForm.get('examenObjetivo')?.patchValue({
      od: {
        esf: examenObjetivo.od_esf || "",
        cil: examenObjetivo.od_cil || "",
        eje: examenObjetivo.od_eje || "",
        avsc: examenObjetivo.od_avsc || ""
      },
      oi: {
        esf: examenObjetivo.oi_esf || "",
        cil: examenObjetivo.oi_cil || "",
        eje: examenObjetivo.oi_eje || "",
        avsc: examenObjetivo.oi_avsc || ""
      }
    });
  
    // Fondo de Ojo
    const fondoOjo = data.fondoOjo?.[0] || {};
    this.mainForm.get('fondoOjo')?.patchValue({
      od: fondoOjo.od || "",
      oi: fondoOjo.oi || ""
    });
  
    // Motilidad Ocular
    const motilidadOcular = data.motilidadOcular?.[0] || {};
    this.mainForm.get('motilidadOcular')?.patchValue({
      od: motilidadOcular.od || "",
      oi: motilidadOcular.oi || "",
      ao: motilidadOcular.ao || ""
    });
  
    // Cover Test
    const coverTest = data.coverTest?.[0] || {};
    this.mainForm.get('coverTest')?.patchValue({
      odVl: coverTest.od_vl || "",
      odVp: coverTest.od_vp || "",
      oiVl: coverTest.oi_vl || "",
      oiVp: coverTest.oi_vp || ""
    });
  
    // Queratometría
    const queratometria = data.queratometria?.[0] || {};
    this.mainForm.get('queratometria')?.patchValue({
      odKeratometria: queratometria.od_keratometria || "",
      oiKeratometria: queratometria.oi_keratometria || ""
    });
  
    // Observaciones
    const observaciones = data.observaciones?.[0] || {};
    this.mainForm.get('observaciones')?.patchValue({
      observaciones: observaciones.observaciones || ""
    });
  
    // Biomicroscopia (si necesitas algo adicional para este campo)
    if (data.biomicroscopia?.length) {
      this.mainForm.get('biomicroscopia')?.patchValue({
        od: {
          images: data.biomicroscopia.filter((item: any) => item.ojo === "OD") || [],
          videos: data.biomicroscopia.filter((item: any) => item.ojo === "OD" && item.tipo === "video") || []
        },
        oi: {
          images: data.biomicroscopia.filter((item: any) => item.ojo === "OI") || [],
          videos: data.biomicroscopia.filter((item: any) => item.ojo === "OI" && item.tipo === "video") || []
        }
      });
    }
  
    // RX Final, PIO, Diagnóstico y Datos Montaje no tienen datos en el ejemplo proporcionado, pero puedes agregar validaciones similares.
  }
  
}
