import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-mesero',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-mesero.html',
  styleUrl: './dashboard-mesero.css',
})
export class DashboardMesero {
  active: string="inicio";

  constructor(private cd: ChangeDetectorRef){}

  onInicioTab() {
    this.active = "inicio";
  }
}
