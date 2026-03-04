import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Booking } from '../../shared/booking';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../shared/booking.service';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../customers/shared/customer.service';
import { ServiceService } from '../../../services/shared/service.service';
import { Service } from '../../../services/shared/service.interface';
import { Customer } from '../../../customers/shared/customer';
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
  bookingId: string | null = null;
  loading = false;
  error: string | null = null;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private customerService: CustomerService,
    private serviceService: ServiceService
  ) { }

  clients: Customer[] = [];

  services: Service[] = [];

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription.add(
      this.customerService.getCustomers().subscribe(data => this.clients = data)
    );
    this.subscription.add(
      this.serviceService.getServices().subscribe(data => this.services = data)
    );

    this.bookingForm = this.fb.group({
      client_id: ['', Validators.required],
      client_name: [''],
      service_id: ['', Validators.required],
      service_name: [''],
      booking_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      booking_status: ['', Validators.required]
    });

    this.bookingId = this.route.snapshot.paramMap.get('id');
    if (this.bookingId === 'new') this.bookingId = null;

    if (this.bookingId) {
      this.isEditMode = true;
      this.loadBooking(this.bookingId);
    }
  }

  loadBooking(id: string): void {
    this.loading = true;
    this.subscription.add(
      this.bookingService.getBooking(id).subscribe({
        next: (booking: Booking | null) => {
          if (booking) {
            this.bookingForm.patchValue({
              client_id: booking.client_id,
              service_id: booking.service_id,
              service_name: booking.service_name,
              booking_date: new Date(booking.booking_date).toISOString().split('T')[0],
              start_time: booking.start_time,
              end_time: booking.end_time,
              booking_status: booking.booking_status
            });
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error cargando turno';
          this.loading = false;
        }
      })
    );
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) return;

    if (this.isEditMode) {
      this.updateExistingBooking();
    } else {
      this.createBooking();
    }
  }

  createBooking(): void {
    this.loading = true;

    const selectedClient = this.clients.find(
      c => c.id === this.bookingForm.value.client_id
    );
    if (!selectedClient) {
      this.error = 'Cliente inválido';
      this.loading = false;
      return;
    }

    const selectedService = this.services.find(
      s => s.id === this.bookingForm.value.service_id
    );
    if (!selectedService) {
      this.error = 'Servicio inválido';
      this.loading = false;
      return;
    }

    const data = {
      ...this.bookingForm.value,
      client_name: selectedClient.name, 
      service_name: selectedService.name
    };

    this.subscription.add(
      this.bookingService.addBooking(data).subscribe({
        next: (booking) => {
          this.loading = false;
          if (booking) this.router.navigate(['/bookings', booking.id]);
        },
        error: (err) => {
          this.error = err.error?.message || 'Error creando turno';
          this.loading = false;
        }
      })
    );
  }

  deleteBooking(): void {
    if (!this.bookingId) return;
    if (!confirm('¿Seguro que deseas eliminar el turno?')) return;

    this.loading = true;

    this.subscription.add(
      this.bookingService.deleteBooking(this.bookingId).subscribe({
        next: (result) => {                          
          this.loading = false;
          if (result.success) this.router.navigate(['/bookings']); 
        },
        error: (err) => {
          this.error = err.error?.message || 'Error eliminando turno';
          this.loading = false;
        }
      })
    );
  }

  updateExistingBooking(): void {
  if (!this.bookingId) return;

  this.loading = true;
  const { client_name, service_name, ...data } = this.bookingForm.value;
  
  console.log('[UPDATE] ID:', this.bookingId, 'Data:', JSON.stringify(data));

  this.subscription.add(
    this.bookingService.updateBooking(this.bookingId, data).subscribe({
      next: (booking) => {
        this.loading = false;
        if (booking) this.router.navigate(['/bookings', booking.id]);
      },
      error: (err) => {
        this.error = err.error?.error?.message || 'Error actualizando turno'; 
        this.loading = false;
      }
    })
  );
}



  onCancel(): void {
    this.router.navigate(['/bookings']);
  }
}
