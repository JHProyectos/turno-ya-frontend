import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../shared/customer.service';
import { Customer } from '../../shared/customer';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-detail',
  imports: [MaterialModule, RouterModule, TitleCasePipe, UpperCasePipe, DatePipe, CommonModule],
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
})
export class CustomerDetail implements OnInit, OnDestroy {
  customer: Customer | null = null;
  loading = true;
  error: string | null = null
  private subscription: Subscription = new Subscription();
  dataSource: Customer[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
   private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomer(id);
    }
  }

  loadCustomer(id: string): void {
    this.loading = true;
    this.subscription.add(
      this.customerService.getCustomer(id).subscribe({
        next: (data: Customer | null) => {
          this.customer = data;
          this.loading = false;
        },
         error: (err: any) => {
          this.error = 'Error al cargar el cliente. Por favor, inténtalo de nuevo.';
          this.loading = false;
        },
        complete: () => {
        }
      })
    );
  }

 deleteCustomer(id: string): void {
  if (!confirm('¿Seguro que querés eliminar este cliente?')) return;

  this.loading = true;

  this.customerService.deleteCustomer(id).subscribe(result => {
    this.loading = false;


    if (result.success && result.status === 204) {
      this.snackBar.open('Cliente eliminado correctamente', 'Cerrar', {
        duration: 3000
      });
      this.goBack(); 
      return;
    }


    if (result.status === 409) {
      this.snackBar.open(
        'No se puede eliminar: el cliente tiene reservas asociadas.',
        'Cerrar',
        { duration: 4000 }
      );
      return;
    }


    if (result.status === 404) {
      this.snackBar.open(
        'El cliente no existe.',
        'Cerrar',
        { duration: 4000 }
      );
      this.goBack(); 
      return;
    }

    this.snackBar.open(
      'Error al eliminar cliente.',
      'Cerrar',
      { duration: 4000 }
    );
  });
}



  goBack(): void {
    this.router.navigate(['/customers']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
