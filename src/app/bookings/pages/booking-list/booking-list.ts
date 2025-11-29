import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { OnInit } from '@angular/core';
import { Booking } from '../../shared/booking';
import { BookingService } from '../../shared/booking.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './booking-list.html',
  styleUrls: ['./booking-list.css'],
})
export class BookingListComponent implements OnInit {

  displayedColumns: string[] = ['client_id', 'service_id', 'booking_date', 'start_time', 'booking_status', 'actions'];
  dataSource: Booking[] = [];
  loading = true;
  error: string | null = null;

  constructor(private bookingService: BookingService) { }

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
        this.error = 'Error al cargar las reservas.';
        this.loading = false;
      }
    });
  }

  deleteBooking(id: string): void {
    if (confirm('¿Seguro que querés eliminar esta reserva?')) {
      this.loading = true;
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(b => String(b.id) !== String(id));
          this.loading = false;
        },
        error: (err) => {
          console.error('Error eliminando la reserva', err);
          this.error = 'No se pudo eliminar la reserva.';
          this.loading = false;
        },
      });
    }
  }
}
