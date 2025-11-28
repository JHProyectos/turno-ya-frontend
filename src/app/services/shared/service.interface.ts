export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category_id?: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}