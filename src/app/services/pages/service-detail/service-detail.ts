import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../shared/materialModule';
import { Subscription } from 'rxjs';
import { ServiceService } from '../../shared/service.service';
import { Service } from '../../shared/service.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-detail',
  imports: [MaterialModule, RouterModule, DatePipe, CommonModule],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css',
})
export class ServiceDetail implements OnInit, OnDestroy {
  service: Service | null = null;
  loading = true;
  error: string | null = null
  private subscription: Subscription = new Subscription();
  dataSource: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadService(id);
    }
  }

  loadService(id: string): void {
    this.loading = true;
    this.subscription.add(
      this.serviceService.getService(id).subscribe({
        next: (data: Service | null) => {
          this.service = data;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Error al cargar el servicio. Por favor, inténtalo de nuevo.';
          this.loading = false;
        },
        complete: () => {
        }
      })
    );
  }

  deleteService(id: number | string): void {
    if (confirm('¿Seguro que querés eliminar este servicio?')) {
      this.loading = true;
      this.serviceService.deleteService(id.toString()).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open('Servicio eliminado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/services']);
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

  goBack(): void {
    this.router.navigate(['/services']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
