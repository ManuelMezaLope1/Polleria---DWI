import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elegir-mesero',
  imports: [],
  templateUrl: './elegir-mesero.html',
  styleUrl: './elegir-mesero.css',
})
export class ElegirMesero {
  constructor(private router: Router){}

  irDashboard(){
    this.router.navigate(['/dashboard-mesero'])
  }

  irPolleria(){
    this.router.navigate(["/polleria"])
  }
}
