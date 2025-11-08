import { Routes } from '@angular/router';
import { Bookings } from './bookings/bookings';
import { Customers } from '../../../obsoletos/customers';
import { CustomerList } from './customers/pages/customer-list/customer-list';
import { CustomerForm } from './customers/pages/customer-form/customer-form';
import { CustomerDetail } from './customers/pages/customer-detail/customer-detail';
import { Services } from './services/services';
import { Home } from './home/home';
import { Component } from '@angular/core';

export const routes: Routes = [
  { path: '', component: Home },  
  { path: 'bookings', component: Bookings },
  { path: 'customers', component: CustomerList },
  { path: 'services', component: Services },
 // { path: 'booking/new', component: BookingForm },
 // { path: 'booking/:id', component: BookingDetail },
 // { path : 'booking/:id/edit', component: BookingForm },
  { path: 'customer/new', component: CustomerForm },
  { path: 'customer/:id', component: CustomerDetail },
  { path : 'customer/:id/edit', component: CustomerForm },
 // { path: 'service/new', component: ServiceForm },
 // { path: 'service/:id', component: ServiceDetail },
 // { path : 'service/:id/edit', component: ServiceForm },*/
  { path: '**', redirectTo: '' }
];
