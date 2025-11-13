import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { MaterialModule } from './shared/materialModule';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('turnosYa');
  navItems: any;

  constructor(private router: Router) { }

  sections = [
    {
      title: 'Reservas',
      path: '/booking',
     },
    {
      title: 'Clientes',
      path: '/customer',
    },
    {
      title: 'Servicios',
      path: '/service',
    },
  ];

  currentSectionTitle = '';

  ngOnInit() {
   
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) =>  {
        const currentUrl = event.urlAfterRedirects;

        // Buscar sección cuya ruta coincida con el prefijo
        const currentSection = this.sections.find(section =>
          currentUrl.startsWith(section.path)
        );

        this.currentSectionTitle = currentSection ? currentSection.title : '';
      });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
