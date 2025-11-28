import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Booking } from '../../shared/booking';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../shared/booking.service';

@Component({
  standalone: true,
  selector: 'app-booking-form',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css',
})
export class BookingForm {
  bookingForm!: FormGroup;
  isEditMode = false;
  bookingId: number | null = null;
  loading = false;
  error: string | null = null;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      client_id: ['', Validators.required],
      service_id: ['', Validators.required],
      booking_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: [''],
      booking_status: ['pending', Validators.required],
      treatment_id: ['', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.bookingId = Number(idParam);
      this.loadBooking(this.bookingId);
    }
  }

  loadBooking(id: number): void {
    console.log('Cargando reserva ID:', id);
    this.loading = true;

    this.subscription.add(
      this.bookingService.getBooking(id).subscribe({
        next: (booking) => {
          if (!booking) {
            console.warn('No se encontró la reserva');
            this.loading = false;
            return;
          }

          console.log('Reserva recibida desde backend:', booking);

          const formattedDate = booking.booking_date
            ? new Date(booking.booking_date).toISOString().substring(0, 10)
            : '';

          this.bookingForm.patchValue({
            client_id: booking.client_id,
            service_id: booking.service_id,
            booking_date: formattedDate,
            start_time: booking.start_time,
            end_time: booking.end_time,
            booking_status: booking.booking_status,
            treatment_id: booking.treatment_id
          });

          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando reserva:', err);
          this.error = 'Error cargando reserva.';
          this.loading = false;
        }
      })
    );
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      console.warn('Formulario inválido:', this.bookingForm.value);
      return;
    }

    this.loading = true;
    this.error = null;

    const bookingData = { ...this.bookingForm.value };

    bookingData.booking_date = bookingData.booking_date?.substring(0, 10);

    console.log('Enviando datos al backend:', bookingData);

    let request;

    if (this.isEditMode && this.bookingId) {
      request = this.bookingService.updateBooking(this.bookingId, bookingData);
    } else {
      request = this.bookingService.addBooking(bookingData);
    }

    this.subscription.add(
      request.subscribe({
        next: (booking) => {
          console.log('Respuesta del backend:', booking);
          this.loading = false;

          if (!booking) {
            this.error = 'No se pudo obtener la reserva creada/actualizada.';
            return;
          }

          this.router.navigate(['/bookings', booking.id]);
        },
        error: (err) => {
          console.error('Error guardando reserva:', err);
          this.error = 'Error guardando la reserva.';
          this.loading = false;
        }
      })
    );
  }

  onCancel(): void {
    this.router.navigate(['/bookings']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
