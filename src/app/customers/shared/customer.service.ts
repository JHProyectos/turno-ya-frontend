import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Customer } from './customer';
import { CreateCustomerDTO, UpdateCustomerDTO } from './customer.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiBase = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient) {}

  private normalizeCustomer(c: any): Customer {
    return {
      ...c,
      id: c.id !== undefined && c.id !== null ? String(c.id) : undefined
    } as Customer;
  }

  private normalizeCustomersArray(payload: any): Customer[] {
    const arr = Array.isArray(payload) ? payload : (payload?.data ?? []);
    return (arr ?? []).map((c: any) => this.normalizeCustomer(c));
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<any>(`${this.apiBase}/all`).pipe(
      map(res => this.normalizeCustomersArray(res)),
      catchError(err => {
        console.error('[CustomerService] getCustomers error', err);
        return of([]);
      })
    );
  }

  getCustomer(id: string): Observable<Customer | null> {
    return this.http.get<any>(`${this.apiBase}/${id}`).pipe(
      map(res => {
        const payload = res?.data ?? res;
        return payload ? this.normalizeCustomer(payload) : null;
      }),
      catchError(err => {
        console.error('[CustomerService] getCustomer error', err);
        return of(null);
      })
    );
  }

  // ✅ CORREGIDO
  addCustomer(data: CreateCustomerDTO): Observable<Customer | null> {
    return this.http.post<any>(this.apiBase, data).pipe(
      map(res => {
        const payload = res?.data ?? res;
        return payload ? this.normalizeCustomer(payload) : null;
      }),
      catchError(err => {
        console.error('[CustomerService] addCustomer error', err);
        throw err; // importante: no ocultar error si querés manejar validaciones
      })
    );
  }

  // ✅ CORREGIDO
  updateCustomer(id: string, data: UpdateCustomerDTO): Observable<Customer | null> {
    return this.http.put<any>(`${this.apiBase}/${id}`, data).pipe(
      map(res => {
        const payload = res?.data ?? res;
        return payload ? this.normalizeCustomer(payload) : null;
      }),
      catchError(err => {
        console.error('[CustomerService] updateCustomer error', err);
        throw err;
      })
    );
  }

  deleteCustomer(id: string): Observable<{ success: boolean; status: number }> {
    return this.http.delete(`${this.apiBase}/${id}`, { observe: 'response' }).pipe(
      map(res => ({
        success: res.status === 204,
        status: res.status
      })),
      catchError(err => {
        console.error('[CustomerService] deleteCustomer error', err);
        return of({
          success: false,
          status: err.status
        });
      })
    );
  }
}