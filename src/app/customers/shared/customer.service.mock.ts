/*import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceMock {
  private mockCustomers: Customer[] = [
  {
    id: 1,
    email: 'customer1@turnoya.com',
    first_name: 'Juan',
    last_name: 'Pérez',
    password: 'password123',
    phone: '1234567890',
    birth_date: '1990-01-01',
    status: 'approved',
    role: 'customer',
    created_at: '2023-01-01T12:00:00Z',
    updated_at: '2023-01-01T12:00:00Z'
  },
   {
    id: 2,
    email: 'customer2@turnosya.com',
    first_name: 'María',
    last_name: 'Gómez',
    password: 'password456',
    phone: '0987654321',
    birth_date: '1992-02-02',
    status: 'pending',
    role: 'professional',
    created_at: '2023-02-01T12:00:00Z',
    updated_at: '2023-02-01T12:00:00Z'
  },
  {
    id: 3,
    email: 'customer3@turnoya.com',
    first_name: 'Carlos',
    last_name: 'López',
    password: 'password789',
    phone: '1122334455',
    birth_date: '1988-03-03',
    status: 'rejected',
    role: 'customer',
    created_at: '2023-03-01T12:00:00Z',
    updated_at: '2023-03-01T12:00:00Z'
    }
];

  getCharacters(): Observable<Customer[]> {
    console.log('📋 Cargando clientes (mock)');
    return of(this.mockCustomers).pipe(delay(500));
  }

  getCharacter(id: string): Observable<Customer> {
    const customer = this.mockCustomers.find(c => c.id = id)!;
    return of(customer).pipe(delay(300));
  }

  addCharacter(character: Omit<Customer, 'id'>): Observable<Customer> {
    const newCustomer = { ...character, id: String(Date.now()) };
    this.mockCustomers.push(newCustomer);
    console.log('✅ Cliente agregado (mock):', newCustomer);
    return of(newCustomer).pipe(delay(300));
  }

  updateCharacter(id: string, character: Partial<Customer>): Observable<Customer> {
    const index = this.mockCustomers.findIndex(c => c.id === id);
    if (index >= 0) {
      this.mockCustomers[index] = { ...this.mockCustomers[index], ...character };
    }
    console.log('✏️ Cliente actualizado (mock):', this.mockCustomers[index]);
    return of(this.mockCustomers[index]).pipe(delay(300));
  }

  deleteCharacter(id: string): Observable<void> {
    this.mockCustomers = this.mockCustomers.filter(c => c.id !== id);
    console.log('🗑️ Cliente eliminado (mock):', id);
    return of(void 0).pipe(delay(200));
  }
}
*/