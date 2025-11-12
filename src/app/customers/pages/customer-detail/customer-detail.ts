import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../shared/customer.service';
import { Customer } from '../../shared/customer';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

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
  dataSource: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) { }

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
    if (confirm('¿Seguro que querés eliminar este cliente?')) {
      this.loading = true;
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter((c: { id: any; }) => String(c.id) !== String(id));
          this.loading = false;
        },
        error: (err) => {
          console.error('Error eliminando cliente', err);
          this.error = 'No se pudo eliminar el cliente.';
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/customers']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
