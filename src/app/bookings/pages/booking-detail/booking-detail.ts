import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Subscription } from 'rxjs';
import { BookingService } from '../../shared/booking.service';
import { Booking } from '../../shared/booking';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-detail',
  imports: [MaterialModule, RouterModule, UpperCasePipe, DatePipe, CommonModule],
  templateUrl: './booking-detail.html',
  styleUrl: './booking-detail.css',
})
export class BookingDetail implements OnInit, OnDestroy {
  booking: Booking | null = null;
  loading = true;
  error: string | null = null
  private subscription: Subscription = new Subscription();
  dataSource: Booking[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBooking(id);
    }
  }


  loadBooking(id: string): void {
    this.loading = true;
    this.subscription.add(
      this.bookingService.getBooking(id).subscribe({
        next: (data: Booking | null) => {
          this.booking = data;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Error al cargar el turno. Por favor, inténtalo de nuevo.';
          this.loading = false;
        },
        complete: () => {
        }
      })
    );
  }

  deleteBooking(id: string) {
    this.bookingService.deleteBooking(id).subscribe({
      next: () => {
        this.router.navigate(['/bookings']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.snackBar.open(
            'Solo se pueden eliminar turnos cancelados',
            'Cerrar',
            { duration: 4000 }
          );
          return;
        } else {
          alert('Ocurrió un error inesperado al intentar eliminar el turno');
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/bookings']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
