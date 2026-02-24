import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Customer } from '../../shared/customer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm {

  customerForm!: FormGroup;
  isEditMode = false;
  customerId: string | null = null;
  loading = false;
  error: string | null = null;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}

 ngOnInit(): void {

  this.customerForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    first_name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
      ]
    ],

    last_name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]
    ],

    phone: [
      '',
      [
        Validators.pattern(/^\+?[0-9]{8,15}$/)
      ]
    ],

    birth_date: ['']
  });

  this.customerId = this.route.snapshot.paramMap.get('id');

  if (this.customerId === 'new') {
    this.customerId = null;
  }

  if (this.customerId) {
    this.isEditMode = true;

    // En edición NO se permite modificar email ni password
    this.customerForm.get('email')?.disable();

    this.customerForm.get('password')?.disable();
    this.customerForm.get('password')?.clearValidators();
    this.customerForm.get('password')?.updateValueAndValidity();

    this.loadCustomer(this.customerId);
  }
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadCustomer(id: string): void {
    this.loading = true;

    this.subscription.add(
      this.customerService.getCustomer(id).subscribe({
        next: (customer: Customer | null) => {
          if (!customer) {
            this.loading = false;
            return;
          }

          this.customerForm.patchValue({
            email: customer.email,
            first_name: customer.first_name,
            last_name: customer.last_name,
            phone: customer.phone,
            birth_date: customer.birth_date
              ? customer.birth_date.split('T')[0]
              : ''
          });

          this.loading = false;
        },
        error: () => {
          this.error = 'Error cargando. Reintente.';
          this.loading = false;
        }
      })
    );
  }

  onSubmit(): void {

    if (this.customerForm.invalid) return;

    this.loading = true;
    this.error = null;

    Object.keys(this.customerForm.controls).forEach(key => {
      this.customerForm.get(key)?.setErrors(null);
    });

    let request;

    if (this.isEditMode && this.customerId) {
      request = this.customerService.updateCustomer(
        this.customerId,
        this.buildUpdatePayload()
      );
    } else {
      request = this.customerService.addCustomer(
        this.buildCreatePayload()
      );
    }

    this.subscription.add(
      request.subscribe({
        next: (customer) => {
          this.showSuccess(`Cliente ${this.isEditMode ? 'actualizado' : 'creado'} correctamente.`);
          this.loading = false;

          if (customer?.id) {
            this.router.navigate(['/customers', customer.id]);
          }
        },
        error: (err: any) => {
          this.loading = false;

          if (err.error?.error?.code === 'VALIDATION_ERROR') {
            this.applyBackendErrors(err.error.error.details);
            return;
          }

          if (err.error?.error?.code === 'EMAIL_DUPLICATE') {
            this.customerForm.get('email')?.setErrors({
              backend: 'El email ya está registrado'
            });
            return;
          }

          this.showError('Error procesando la solicitud.');
        }
      })
    );
  }

  private buildCreatePayload() {
    const { email, first_name, last_name, password, phone, birth_date } = this.customerForm.value;

    return {
      email,
      first_name,
      last_name,
      password,
      phone: phone || undefined,
      birth_date: birth_date || undefined,
      status: 'pending' as const,
      role: 'customer' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  private buildUpdatePayload() {
    const { first_name, last_name, phone, birth_date } = this.customerForm.getRawValue();

    return Object.fromEntries(
      Object.entries({ first_name, last_name, phone, birth_date })
        .filter(([_, v]) => v !== null && v !== '')
    );
  }

  private applyBackendErrors(details: any[]): void {
    details.forEach(detail => {
      const control = this.customerForm.get(detail.field);
      if (control) {
        control.setErrors({
          backend: detail.message
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }
}