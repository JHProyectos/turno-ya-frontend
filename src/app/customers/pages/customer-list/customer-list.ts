import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Customer } from '../../shared/customer';
import { CustomerService } from '../../shared/customer.service';
import { MaterialModule } from '../../../shared/materialModule';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.css'],
})
export class CustomerList implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'status', 'actions'];
  dataSource: Customer[] = [];
  loading = true;
  error: string | null = null;

  constructor(private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) { }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3500,
      panelClass: ['snackbar-error']  // opcional si querés estilo
    });
  }
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 0,
      panelClass: ['snackbar-success']
    });
  }


  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.dataSource = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading customers', err);
        this.error = 'Error al cargar los clientes.';
        this.loading = false;
      }
    });
  }

  deleteCustomer(id: string): void {

    if (!confirm('¿Seguro que querés eliminar este cliente?')) return;

    this.loading = true;

    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.showSuccess('Cliente eliminado con éxito.');
        this.loadCustomers();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error eliminando cliente', err);

        if (err.status === 404) {
          this.showError('Cliente no encontrado.');
        } else if (err.status === 409) {
          this.showError('No se puede eliminar: el cliente tiene reservas asociadas.');
          //this.error = 'No se puede eliminar: el cliente tiene reservas asociadas.';
        } else {
          this.showError('Error al eliminar el cliente.');
          //this.error = 'Error al eliminar el cliente.';
        }

        this.loading = false;
      }
    });
  }



}
