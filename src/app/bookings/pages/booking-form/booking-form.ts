import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Booking } from '../../shared/booking';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../shared/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-booking-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
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
  ) {
    this.bookingForm = this.fb.group({
      client_id: ['', Validators.required],
      service_id: ['', Validators.required],
      booking_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: [''],
      booking_status: ['pending', Validators.required]
    });
  }

  get items() {
    return this.bookingForm.get('items') as FormArray;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

    if (!idParam || idParam === 'new') {
      this.bookingId = null;
    } else {
      this.bookingId = Number(idParam);

      if (!isNaN(this.bookingId)) {
        this.isEditMode = true;
        this.loadBooking(this.bookingId);
      }
    }

    if (this.bookingId) {
      this.isEditMode = true;
      this.loadBooking(this.bookingId);
    }
  }

  loadBooking(id: number): void {
    this.loading = true;
    this.subscription.add(
      this.bookingService.getBooking(id).subscribe({
        next: (booking: Booking | null) => {
          if (!booking) { //si booking es null
            this.loading = false;
            return;
          }

          const formattedDate = booking.booking_date
            ? new Date(booking.booking_date).toISOString().split('T')[0]
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
        error: (err: any) => {
          this.error = 'Error cargando. Reintente.';
          this.loading = false;
        }
      })
    );
  }

  onSubmit(): void {
      if (this.bookingForm.invalid) return;

  this.loading = true;
  this.error = null;

  const bookingData = {
    ...this.bookingForm.value,
    treatment_id: 1
  };

  let request;
    if (this.isEditMode) {
      this.updateExistingBooking();
    } else {
      this.createBooking();
    }
    if (this.bookingForm.valid) {
      this.loading = true;
      this.error = null;
      const formValue = this.bookingForm.value;
      const bookingData = {
        ...formValue,
        bookingData: formValue.bookingData || {},
      };

      let request;

      if (this.isEditMode && this.bookingId) {
        request = this.bookingService.updateBooking(this.bookingId, bookingData);
      } else {
        request = this.bookingService.addBooking(bookingData as Omit<Booking, 'id'>);
      }

      this.subscription.add(
        request.subscribe({
          next: (booking) => {
            if (!booking) { //si booking es null
              this.loading = false;
              return;
            }
            this.loading = false;
            this.router.navigate(['/bookings', booking.id]);
          },
          error: (err: any) => {
            this.error = `Error ${this.isEditMode ? 'updating' : 'adding'} booking. Please try again.`;
            this.loading = false;
          }
        })
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/bookings']);
  }

  createBooking(): void {
    if (this.bookingForm.invalid) return;

    this.loading = true;
    const bookingData = this.bookingForm.value;

    this.subscription.add(
      this.bookingService.addBooking(bookingData).subscribe({
        next: (booking) => {
          if (!booking) {
            this.loading = false;
            return;
          }
          this.loading = false;
          this.router.navigate(['/bookings', booking.id]);
        },
        error: () => {
          this.error = 'Error creando reserva. Intenta nuevamente.';
          this.loading = false;
        }
      })
    );
  }


  updateExistingBooking(): void {
    if (this.bookingForm.invalid || !this.bookingId) return;

    this.loading = true;
    const bookingData = this.bookingForm.value;

    this.subscription.add(
      this.bookingService.updateBooking(this.bookingId, bookingData).subscribe({
        next: (booking) => {
          if (!booking) {
            this.loading = false;
            return;
          }
          this.loading = false;
          this.router.navigate(['/bookings', booking.id]);
        },
        error: () => {
          this.error = 'Error actualizando reserva. Intenta nuevamente.';
          this.loading = false;
        }
      })
    );
  }


  rejectBooking(arg0: any) {
    throw new Error('Method not implemented.');
  }
  acceptBooking(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
