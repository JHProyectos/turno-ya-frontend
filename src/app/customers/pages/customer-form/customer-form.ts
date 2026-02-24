import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Customer } from '../../shared/customer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCustomerDTO, UpdateCustomerDTO } from '../../shared/customer.dto';

@Component({
  selector: 'app-customer-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm implements OnInit, OnDestroy {

  customerForm!: FormGroup;
  isEditMode = false;
  customerId: string | null = null;
  loading = false;
  error: string | null = null;
  today: string;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {
      this.today = new Date().toISOString().split('T')[0];
  }

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
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
          this.noRepeatedCharsValidator()
        ]
      ],

      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
          this.noRepeatedCharsValidator()
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
          Validators.pattern(/^\+?[0-9]{10,15}$/)
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

  // Validador personalizado para caracteres repetidos
  private noRepeatedCharsValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const repeatedPattern = /(.)\1{2,}/;
      if (repeatedPattern.test(value)) {
        return { repeatedChars: 'No puede tener 3 o más letras iguales consecutivas' };
      }

      return null;
    };
  }

  // Método para filtrar input del teléfono en tiempo real
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Solo permitir números y + al inicio
    value = value.replace(/[^\d+]/g, '');

    // Solo permitir + al inicio
    if (value.indexOf('+') > 0) {
      value = value.replace(/\+/g, '');
    }

    // Si hay múltiples +, dejar solo uno al inicio
    const parts = value.split('+');
    if (parts.length > 2) {
      value = '+' + parts.slice(1).join('');
    }

    // Actualizar el valor
    input.value = value;
    this.customerForm.get('phone')?.setValue(value, { emitEvent: false });
  }

  loadCustomer(id: string): void {
    this.loading = true;

    this.subscription.add(
      this.customerService.getCustomer(id).subscribe({
        next: (customer: Customer | null) => {
          if (!customer) {
            this.loading = false;
            this.showError('Cliente no encontrado');
            return;
          }

          this.customerForm.patchValue({
            email: customer.email,
            first_name: customer.first_name,
            last_name: customer.last_name,
            phone: customer.phone || '',
            birth_date: customer.birth_date || ''
          });

          this.loading = false;
        },
        error: () => {
          this.error = 'Error cargando datos del cliente. Por favor, reintente.';
          this.loading = false;
        }
      })
    );
  }

  onSubmit(): void {

    if (this.customerForm.invalid) {
      this.markFormGroupTouched(this.customerForm);
      return;
    }

    this.loading = true;
    this.error = null;

    // Limpiar errores previos del backend
    Object.keys(this.customerForm.controls).forEach(key => {
      const control = this.customerForm.get(key);
      const currentErrors = control?.errors;
      
      if (currentErrors && currentErrors['backend']) {
        delete currentErrors['backend'];
        control?.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
      }
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
          } else {
            this.router.navigate(['/customers']);
          }
        },
        error: (err: any) => {
          this.loading = false;

          // Error de validación de Zod
          if (err.error?.error?.code === 'VALIDATION_ERROR') {
            this.applyBackendErrors(err.error.error.details);
            this.showError('Por favor, corrige los errores en el formulario.');
            return;
          }

          // Email duplicado
          if (err.error?.error?.code === 'EMAIL_DUPLICATE') {
            this.customerForm.get('email')?.setErrors({
              backend: 'El email ya está registrado'
            });
            this.showError('El email ya está registrado.');
            return;
          }

          // Error genérico
          this.showError('Error procesando la solicitud. Por favor, reintente.');
        }
      })
    );
  }

  // Construir payload para crear (solo campos permitidos)
  private buildCreatePayload(): CreateCustomerDTO {
    const form = this.customerForm.value;
    
    const payload: CreateCustomerDTO = {
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      password: form.password
    };

    if (form.phone) payload.phone = form.phone;
    if (form.birth_date) payload.birth_date = form.birth_date;

    return payload;
  }

  // Construir payload para actualizar (solo campos modificables)
  private buildUpdatePayload(): UpdateCustomerDTO {
    const form = this.customerForm.getRawValue();

    const payload: UpdateCustomerDTO = {};

    if (form.first_name) payload.first_name = form.first_name;
    if (form.last_name) payload.last_name = form.last_name;
    if (form.phone) payload.phone = form.phone;
    if (form.birth_date) payload.birth_date = form.birth_date;

    return payload;
  }

  // Aplicar errores del backend a los campos
  private applyBackendErrors(details: any[]): void {
    details.forEach(detail => {
      const control = this.customerForm.get(detail.field);
      if (control) {
        control.setErrors({
          backend: detail.message
        });
        control.markAsTouched();
      }
    });
  }

  // Marcar todos los campos como tocados para mostrar errores
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
