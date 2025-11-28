import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Service } from '../../shared/service.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../shared/service.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-form',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './service-form.html',
  styleUrl: './service-form.css',
})
export class ServiceForm {

  serviceForm!: FormGroup;
  isEditMode = false;
  serviceId: string | null = null;
  loading = false;
  error: string | null = null;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService) {

    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required]
    });

    this.serviceId = this.route.snapshot.paramMap.get('id');
    if (this.serviceId === 'new') {
      this.serviceId = null;
    }

    if (this.serviceId) {
      this.isEditMode = true;
      this.loadService(this.serviceId);
    }
  }

  loadService(id: string): void {
    this.loading = true;
    this.subscription.add(
      this.serviceService.getService(id).subscribe({
        next: (service: Service | null) => {
          if (!service) {
            this.loading = false;
            return;
          }

          this.serviceForm.patchValue({
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration
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
    console.log('onSubmit called');
    console.log('Form valid:', this.serviceForm.valid);
    console.log('Form value:', this.serviceForm.value);
    console.log('Form errors:', this.serviceForm.errors);

    if (this.serviceForm.valid) {
      this.loading = true;
      this.error = null;

      const formValue = this.serviceForm.value;
      const serviceData = {
        ...formValue,
        price: Number(formValue.price),
        duration: Number(formValue.duration),
        category_id: 1, // Default category
        image_url: null // Default image
      };

      console.log('Sending service data:', serviceData);

      let request;

      if (this.isEditMode && this.serviceId) {
        request = this.serviceService.updateService(this.serviceId, serviceData);
      } else {
        request = this.serviceService.addService(serviceData as Omit<Service, 'id'>);
      }

      this.subscription.add(
        request.subscribe({
          next: (service) => {
            console.log('Service saved successfully:', service);
            if (!service) {
              // This might happen if the service returns null for some reason, 
              // but with the new error handling, errors should go to the error block.
              this.error = 'Unexpected error: No data returned.';
              this.loading = false;
              return;
            }
            this.loading = false;
            this.router.navigate(['/services', service.id]);
          },
          error: (err: any) => {
            console.error('Error saving service:', err);
            this.error = `Error ${this.isEditMode ? 'updating' : 'adding'} service. ${err.message || 'Please try again.'}`;
            this.loading = false;
          }
        })
      );
    } else {
      console.warn('Form is invalid');
      Object.keys(this.serviceForm.controls).forEach(key => {
        const controlErrors = this.serviceForm.get(key)?.errors;
        if (controlErrors) {
          console.warn('Key control: ' + key + ', errors: ' + JSON.stringify(controlErrors));
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/services']);
  }
}
