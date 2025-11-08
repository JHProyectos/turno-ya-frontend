import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceMock {
  private mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    characterClass: 'Guerrero',
    level: 15,
    hp: 180,
    mana: 40,
    attack: 35,
    items: ['Espada larga', 'Escudo templado']
  },
  {
    id: '2',
    name: 'María Gómez',
    characterClass: 'Hechicera',
    level: 18,
    hp: 95,
    mana: 160,
    attack: 28,
    items: ['Báculo de fuego', 'Anillo de maná']
  },
  {
    id: '3',
    name: 'Carlos Díaz',
    characterClass: 'Arquero',
    level: 12,
    hp: 130,
    mana: 70,
    attack: 30,
    items: ['Arco compuesto', 'Flechas explosivas']
  },
  {
    id: '4',
    name: 'Lucía Fernández',
    characterClass: 'Clériga',
    level: 14,
    hp: 110,
    mana: 140,
    attack: 22,
    items: ['Maza sagrada', 'Amuleto de sanación']
  },
  {
    id: '5',
    name: 'Pedro Ramírez',
    characterClass: 'Ladrón',
    level: 11,
    hp: 105,
    mana: 50,
    attack: 32,
    items: ['Dagas gemelas', 'Capa de invisibilidad']
  }
];

  getCharacters(): Observable<Customer[]> {
    console.log('📋 Cargando clientes (mock)');
    return of(this.mockCustomers).pipe(delay(500));
  }

  getCharacter(id: string): Observable<Customer> {
    const customer = this.mockCustomers.find(c => c.id === id)!;
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
