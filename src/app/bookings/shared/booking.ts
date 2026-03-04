export interface Booking {
  id: string;
  client_id: number;
  client_name: string;
  service_id: number;
  service_name: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  booking_status: 'confirmed' | 'cancelled' | 'completed' | 'pending';
  treatment_id?: string;
  created_at: string;
  updated_at: string;
} 