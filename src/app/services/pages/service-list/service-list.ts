import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Service } from '../../shared/service.interface';
import { ServiceService } from '../../shared/service.service';
import { MaterialModule } from '../../../shared/materialModule';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './service-list.html',
  styleUrls: ['./service-list.css'],
})
export class ServiceList implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'price', 'duration', 'actions'];
  dataSource: Service[] = [];
  loading = true;
  error: string | null = null;


  constructor(private serviceService: ServiceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.error = null;

    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.dataSource = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading services', err);
        this.error = 'Error al cargar los servicios.';
        this.loading = false;
      }
    });
  }

  deleteService(id: string): void {
    if (confirm('¿Seguro que querés eliminar este servicio?')) {
      this.loading = true;
      this.serviceService.deleteService(id).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(s => String(s.id) !== String(id));
          this.loading = false;
          this.snackBar.open('Servicio eliminado correctamente', 'Cerrar', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error('Error eliminando servicio', err);
          this.loading = false;
          if (err.status === 409) {
            this.snackBar.open('No se puede eliminar: el servicio tiene reservas asociadas.', 'Cerrar', {
              duration: 5000,
            });
          } else {
            this.error = 'No se pudo eliminar el servicio.';
            this.snackBar.open('Error al eliminar el servicio', 'Cerrar', {
              duration: 3000,
            });
          }
        }
      });
    }
  }

}
