import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { OnInit } from '@angular/core';
import { Booking } from '../../shared/booking';
import { BookingService } from '../../shared/booking.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './booking-list.html',
  styleUrls: ['./booking-list.css'],
})
export class BookingListComponent implements OnInit {

  displayedColumns: string[] = ['client_name', 'service_name', 'booking_date', 'start_time', 'booking_status', 'actions'];
  dataSource: Booking[] = [];
  loading = true;
  error: string | null = null;

  constructor(private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) { }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3500,
      panelClass: ['snackbar-error']
    });
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.dataSource = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bookings', err);
        this.error = 'Error al cargar los turnos.';
        this.loading = false;
      }
    });
  }

  deleteBooking(id: string): void {
  if (!confirm('¿Seguro que querés eliminar este turno?')) return;

  this.loading = true;
  this.bookingService.deleteBooking(id).subscribe({
    next: (result) => {
      this.loading = false;
      if (result.success) {
        this.dataSource = this.dataSource.filter(b => String(b.id) !== String(id));
        return;
      }
      if (result.status === 409) {
        this.showError('Solo se pueden eliminar turnos cancelados');
      } else {
        this.showError('Error inesperado al intentar eliminar el turno');
      }
    },
    error: (err) => {
      this.loading = false;
      this.showError('Error de conexión al intentar eliminar');
    }
  });
}



}
