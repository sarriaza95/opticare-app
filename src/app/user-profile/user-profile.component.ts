import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentDate: string; // Propiedad que contendrá la fecha como texto

  constructor() { }

  ngOnInit() {
    // Inicializa con la fecha actual en formato 'yyyy-MM-dd'
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0]; // Formato: yyyy-MM-dd
  }

}
