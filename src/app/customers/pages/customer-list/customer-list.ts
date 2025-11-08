import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Customer } from '../../shared/customer';
import { CustomerService } from '../../shared/customer.service';
import { CustomerServiceMock } from '../../shared/customer.service.mock';
import { MaterialModule } from '../../../shared/materialModule';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.css'],
})

export class CustomerList implements OnInit {
  displayedColumns: string[] = ['name', 'characterClass', 'level', 'hp', 'mana', 'attack', 'items', 'actions'];
  dataSource: Customer[] = [];
  loading = true;
  error: string | null = null;

  constructor(private customerService: CustomerServiceMock) {}


  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    console.log('Loading customers...');
    this.customerService.getCharacters().subscribe({
      next: (data) => {
        console.log('Customers received:', data);
        this.dataSource = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading customers', err);
        this.error = 'Error loading customers. Please try again later.';
        this.dataSource = [];
        this.loading = false;
      }
    });
  }

  deleteCharacter(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.loading = true;
      this.customerService.deleteCharacter(id).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter((customer: Customer) => customer.id !== id);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error deleting customer', err);
          this.error = 'Error al eliminar el cliente. Por favor, inténtalo de nuevo.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}

