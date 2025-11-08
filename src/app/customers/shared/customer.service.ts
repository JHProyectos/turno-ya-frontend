import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/all';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Customer[]> {
    return this.http.get<{data: Customer[]}>(this.apiUrl).pipe(
      map(response => {
        return response?.data || [];
      })
    );
  }

  getCharacter(id: string): Observable<Customer> {
    return this.http.get<{data: Customer}>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  addCharacter(character: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.post<{data: Customer}>(this.apiUrl, character).pipe(
      map(response => response.data)
    );
  }

  updateCharacter(id: string, character: Partial<Customer>): Observable<Customer> {
    return this.http.put<{data: Customer}>(`${this.apiUrl}/${id}`, character).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  deleteCharacter(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
