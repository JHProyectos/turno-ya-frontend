import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Booking } from './booking';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiBase = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) {}

  private normalizeBooking(b: any): Booking {
    return {
      ...b,
      id: b.id !== undefined && b.id !== null ? String(b.id) : undefined
    } as Booking;
  }

  private normalizeBookingsArray(payload: any): Booking[] {
    const arr = Array.isArray(payload) ? payload : (payload?.data ?? []);
    return (arr ?? []).map((b: any) => this.normalizeBooking(b));
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<any>(`${this.apiBase}/all`).pipe(
      map(response => this.normalizeBookingsArray(response)),
      catchError(err => {
        console.error('[BookingService] getBookings error', err);
        return of([]);
      })
    );
  }

  getBooking(id: string): Observable<Booking | null> {
    return this.http.get<any>(`${this.apiBase}/${id}`).pipe(
      map(res => {
        const payload = res?.data ?? res;
        return payload ? this.normalizeBooking(payload) : null;
      }),
      catchError(err => {
        console.error('[BookingService] getBooking error', err);
        return of(null);
      })
    );
  }

  addBooking(booking: Omit<Booking, 'id'>): Observable<Booking | null> {
    return this.http.post<any>(this.apiBase, booking).pipe(
      map(res => this.normalizeBooking(res?.data ?? res)),
      catchError(err => {
        console.error('[BookingService] addBooking error', err);
        throw err; 
      })
    );
  }

  updateBooking(id: string, booking: Partial<Booking>): Observable<Booking | null> {
    return this.http.put<any>(`${this.apiBase}/${id}`, booking).pipe(
      map(res => this.normalizeBooking(res?.data ?? res)),
      catchError(err => {
        console.error('[BookingService] updateBooking error', err);
        throw err; 
      })
    );
  }

  deleteBooking(id: string): Observable<{ success: boolean; status: number }> {
    
    return this.http.delete(this.apiBase + `/${id}`, { observe: 'response' }).pipe(
      map(res => ({
        success: res.status === 204,
        status: res.status
      })),
      catchError(err => {
        console.error('[BookingService] deleteBooking error', err);
        return of({ success: false, status: err.status });
      })
    );
  }
}