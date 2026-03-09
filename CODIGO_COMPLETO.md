# TurnosYa Frontend - Codigo Completo

Este documento contiene todo el codigo fuente del proyecto TurnosYa Frontend, una aplicacion Angular para gestion de turnos.

---

## Tabla de Contenidos

1. [Archivos de Configuracion](#archivos-de-configuracion)
2. [Archivos Principales (src/)](#archivos-principales-src)
3. [App Component](#app-component)
4. [Shared Module](#shared-module)
5. [Home Component](#home-component)
6. [Customers Module](#customers-module)
7. [Bookings Module](#bookings-module)
8. [Services Module](#services-module)

---

## Archivos de Configuracion

### package.json

```json
{
  "name": "turno-ya-frontend",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "prettier": {
    "printWidth": 100,
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "angular"
        }
      }
    ]
  },
  "private": true,
  "dependencies": {
    "@angular/cdk": "^20.2.12",
    "@angular/common": "^20.3.0",
    "@angular/compiler": "^20.3.0",
    "@angular/core": "^20.3.0",
    "@angular/forms": "^20.3.0",
    "@angular/material": "^20.2.12",
    "@angular/platform-browser": "^20.3.0",
    "@angular/router": "^20.3.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular/build": "^20.3.4",
    "@angular/cli": "^20.3.4",
    "@angular/compiler-cli": "^20.3.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.9.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.9.2"
  }
}
```

### angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "turnosYa": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/custom-theme.scss",
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "turnosYa:build:production"
            },
            "development": {
              "buildTarget": "turnosYa:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular/build:extract-i18n"
        },
        "test": {
          "builder": "@angular/build:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

### tsconfig.json

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "typeCheckHostBindings": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
```

### tsconfig.app.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "src/**/*.spec.ts"
  ]
}
```

### tsconfig.spec.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

### .editorconfig

```ini
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

### .gitignore

```
# See https://docs.github.com/get-started/getting-started-with-git/ignoring-files for more about ignoring files.

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings
__screenshots__/

# System files
.DS_Store
Thumbs.db
```

---

## Archivos Principales (src/)

### src/index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>TurnosYa</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

### src/main.ts

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';



bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

### src/styles.css

```css
/* You can add global styles to this file, and also import other style files */

html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }

html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
```

### src/custom-theme.scss

```scss

// Include theming for Angular Material with `mat.theme()`.
// This Sass mixin will define CSS variables that are used for styling Angular Material
// components according to the Material 3 design spec.
// Learn more about theming and how to use it for your application's
// custom components at https://material.angular.dev/guide/theming
@use '@angular/material' as mat;

html {
  @include mat.theme((
    color: (
      primary: mat.$azure-palette,
      tertiary: mat.$blue-palette,
    ),
    typography: Roboto,
    density: 0,
  ));
}

body {
  // Default the application to a light color theme. This can be changed to
  // `dark` to enable the dark color theme, or to `light dark` to defer to the
  // user's system settings.
  color-scheme: light;

  // Set a default background, font and text colors for the application using
  // Angular Material's system-level CSS variables. Learn more about these
  // variables at https://material.angular.dev/guide/system-variables
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);

  // Reset the user agent margin.
  margin: 0;
}
```

---

## App Component

### src/app/app.ts

```typescript
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
  currentSectionPath: string | undefined;

  constructor(private router: Router) { }

  sections = [
    {
      title: 'Turnos',
      path: '/bookings',
     },
    {
      title: 'Clientes',
      path: '/customers',
    },
    {
      title: 'Servicios',
      path: '/services',
    },
  ];

  currentSectionTitle = '';

  ngOnInit() {
   
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) =>  {
        const currentUrl = event.urlAfterRedirects;

        // Buscar seccion cuya ruta coincida con el prefijo
        const currentSection = this.sections.find(section =>
          currentUrl.startsWith(section.path)
        );

        this.currentSectionTitle = currentSection ? currentSection.title : '';
    this.currentSectionPath = currentSection ? currentSection.path : '';
  });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
```

### src/app/app.html

```html
<mat-toolbar color="primary" class="top-nav" role="navigation">
<div class="toolbar-content">

<nav class="nav-buttons" aria-label="Navegacion principal">
<button mat-button="outlined" [routerLink]="['/']" aria-label="Inicio">Inicio</button>
<button mat-button [routerLink]="[currentSectionPath]" *ngIf="currentSectionTitle">
  {{ currentSectionTitle }}
</button>
</nav>
</div>
</mat-toolbar>

<main class="main-content">
  <div class="container">
    
    <router-outlet></router-outlet>
  </div>
</main>
```

### src/app/app.css

*(Archivo vacio)*

### src/app/app.config.ts

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
```

### src/app/app.routes.ts

```typescript
import { Routes } from '@angular/router';
import { CustomerList } from './customers/pages/customer-list/customer-list';
import { CustomerForm } from './customers/pages/customer-form/customer-form';
import { CustomerDetail } from './customers/pages/customer-detail/customer-detail';
import { BookingListComponent } from './bookings/pages/booking-list/booking-list';
import { BookingForm } from './bookings/pages/booking-form/booking-form';
import { BookingDetail } from './bookings/pages/booking-detail/booking-detail';
import { ServiceList } from './services/pages/service-list/service-list';
import { ServiceForm } from './services/pages/service-form/service-form';
import { ServiceDetail } from './services/pages/service-detail/service-detail';
import { Home } from './home/home';
import { Component } from '@angular/core';
import { App } from './app';

export const routes: Routes = [
  { path: '', component: Home },  
  { path: 'bookings', component: BookingListComponent },
  { path: 'customers', component: CustomerList },
  { path: 'bookings/new', component: BookingForm },
  { path: 'bookings/:id', component: BookingDetail },
  { path: 'bookings/:id/edit', component: BookingForm },
  { path: 'customers/new', component: CustomerForm },
  { path: 'customers/:id', component: CustomerDetail },
  { path: 'customers/:id/edit', component: CustomerForm },
  { path: 'services', component: ServiceList },
  { path: 'services/new', component: ServiceForm },
  { path: 'services/:id', component: ServiceDetail },
  { path: 'services/:id/edit', component: ServiceForm },
  { path: '**', redirectTo: '' }
];
```

### src/app/app.spec.ts

```typescript
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, turnosYa');
  });
});
```

---

## Shared Module

### src/app/shared/materialModule.ts

```typescript
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import { MatNavList } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker } from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';



export const MaterialModule = [
  MatToolbarModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTableModule,
  FormsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatDivider,
  MatNavList,
  MatInputModule,
  MatDatepicker,
  MatSnackBarModule
] as const;
```

---

## Home Component

### src/app/home/home.ts

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../shared/materialModule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
navItems: any;
  constructor(private router: Router) {}

  sections = [
    {
      title: 'Turnos',
      path: '/bookings',
      icon: 'event',
      description: 'Gestiona tus turnos facilmente.',
    },
    {
      title: 'Clientes',
      path: '/customers',
      icon: 'people',
      description: 'Administra la informacion de tus clientes.',
    },
    {
      title: 'Servicios',
      path: '/services',
      icon: 'build',
      description: 'Defini y actualiza tus servicios disponibles.',
    },
  ];

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
```

### src/app/home/home.html

```html

<div class="home-container">
  <h1 class="home-title">Gestor de Turnos</h1>
  <mat-grid-list cols="3" gutterSize="24px" rowHeight="1:1" class="home-grid">
    <mat-grid-tile *ngFor="let section of sections">
      <mat-card class="home-card" (click)="navigateTo(section.path)">
        <mat-icon class="home-icon" color="primary">{{ section.icon }}</mat-icon>
        <mat-card-title>{{ section.title }}</mat-card-title>
        <mat-card-content>
          <p>{{ section.description }}</p>
        </mat-card-content>
      </mat-card>
    </mat-grid-tile>
  </mat-grid-list>
</div>
```

### src/app/home/home.css

```css
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 5rem 1rem 4rem;
  background: linear-gradient(to bottom, #f5f9ff 0%, #e3f2fd 100%);
}

.home-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: #0d47a1;
  margin-bottom: 3rem;
  text-align: center;
}

.home-grid {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.home-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  cursor: pointer;
  border-radius: 16px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
}

.home-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
  background: #fafcff;
}

.home-icon {
  font-size: 64px !important;
  width: 80px !important;
  height: 80px !important;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

mat-card-title {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  color: #1a3e72 !important;
  margin: 0.5rem 0 !important;
}

mat-card-content p {
  margin: 0;
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}


@media (max-width: 960px) {
  .home-grid {
    cols: 2;
  }
}

@media (max-width: 600px) {
  .home-grid {
    cols: 1;
  }

  .home-title {
    font-size: 2.3rem;
  }

  .home-card {
    padding: 1.8rem;
  }
}
```

### src/app/home/home.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Customers Module

### src/app/customers/shared/customer.ts

```typescript
export interface Customer {
name: any;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string,
  phone?: string;
  birth_date?: string;
  role: 'customer' | 'professional';
  created_at: string;
  updated_at: string;
}
```

### src/app/customers/shared/customer.dto.ts

```typescript
export interface CreateCustomerDTO {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone?: string;
  birth_date?: string;
}

export interface UpdateCustomerDTO {
  first_name?: string;
  last_name?: string;
  phone?: string;
  birth_date?: string;
}
```

### src/app/customers/shared/customer.service.ts

```typescript
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

  addCustomer(data: CreateCustomerDTO): Observable<Customer | null> {
    return this.http.post<any>(this.apiBase, data).pipe(
      map(res => {
        const payload = res?.data ?? res;
        return payload ? this.normalizeCustomer(payload) : null;
      }),
      catchError(err => {
        console.error('[CustomerService] addCustomer error', err);
        throw err; // importante: no ocultar error si queres manejar validaciones
      })
    );
  }

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
```

### src/app/customers/pages/customer-list/customer-list.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Customer } from '../../shared/customer';
import { CustomerService } from '../../shared/customer.service';
import { MaterialModule } from '../../../shared/materialModule';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.css'],
})
export class CustomerList implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'actions'];
  dataSource: Customer[] = [];
  loading = true;
  error: string | null = null;

  constructor(private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) { }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3500,
      panelClass: ['snackbar-error']  
    });
  }
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 0,
      panelClass: ['snackbar-success']
    });
  }


  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.dataSource = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading customers', err);
        this.error = 'Error al cargar los clientes.';
        this.loading = false;
      }
    });
  }

 deleteCustomer(id: number): void {

  if (!confirm('Seguro que queres eliminar este cliente?')) return;

  this.loading = true;

  this.customerService.deleteCustomer(String(id)).subscribe(result => {
    this.loading = false;

    if (result.success && result.status === 204) {
      this.dataSource = this.dataSource.filter(c => c.id !== id);
      this.showSuccess('Cliente eliminado correctamente');
      return;
    }

    if (result.status === 409) {
      this.showError('No se puede eliminar: el cliente tiene reservas asociadas.');
      return;
    }

    if (result.status === 404) {
      this.showError('El cliente no existe.');
      return;
    }

    this.showError('Error al eliminar cliente.');
  });
}




}
```

### src/app/customers/pages/customer-list/customer-list.html

```html
<div class="table-container">
  <div class="table-header">
    <h2>Clientes</h2>
  </div>

  <div *ngIf="loading" class="loading-shade">
    <mat-spinner></mat-spinner>
  </div>

  <div *ngIf="!loading && dataSource.length === 0" class="no-data">
    <p>No se encontraron clientes. Ingresa tu primer cliente!</p>
  </div>

  <div *ngIf="error" class="error-box">
    {{ error }}
  </div>

  <div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <!-- Nombre -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Nombre</th>
        <td mat-cell *matCellDef="let customer">
          <a [routerLink]="['/customers', customer.id]" class="customer-link">
            {{ customer.name }}
          </a>
        </td>
      </ng-container>

      <!-- Email -->
      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let customer">
          {{ customer.email }}
        </td>
      </ng-container>

      <!-- Acciones -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let customer" class="actions-cell">
          <button mat-icon-button color="primary"
                  [routerLink]="['/customers', customer.id]"
                  matTooltip="Ver detalles">
            <mat-icon>visibility</mat-icon>
          </button>

          <button mat-icon-button color="warn"
                  (click)="deleteCustomer(customer.id!)"
                  matTooltip="Eliminar cliente">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <!-- Header y filas -->
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <button mat-raised-button color="accent" routerLink="/customers/new" class="add-button">
      <mat-icon>person_add</mat-icon>
      <span>Agregar Cliente</span>
    </button>
  </div>
</div>
```

### src/app/customers/pages/customer-list/customer-list.css

```css
.snackbar-error {
  background-color: #d32f2f !important; 
  color: white !important;
}

.snackbar-success {
  background-color: #2e7d32 !important; 
  color: white !important;
}

.table-container {
	max-width: 1000px;
	margin: 20px auto;
	padding: 0 16px;
}

.table-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	padding: 0 8px;
}

.table-header h2 {
	margin: 0;
	color: #3f51b5;
	font-size: 1.8rem;
	font-weight: 500;
}

table.mat-elevation-z8 {
	width: 100%;
	border-collapse: separate;
}

.service-link {
	text-decoration: none;
	color: inherit;
}

.no-data {
	text-align: center;
	margin-top: 1rem;
	color: #888;
}

.loading-shade {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80px;
}

.add-button {
	margin-top: 16px;
}

.mat-column-description {
	max-width: 300px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
```

### src/app/customers/pages/customer-list/customer-list.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerList } from './customer-list';

describe('CustomerList', () => {
  let component: CustomerList;
  let fixture: ComponentFixture<CustomerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### src/app/customers/pages/customer-form/customer-form.ts

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Customer } from '../../shared/customer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCustomerDTO, UpdateCustomerDTO } from '../../shared/customer.dto';

@Component({
  selector: 'app-customer-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm implements OnInit, OnDestroy {

  customerForm!: FormGroup;
  isEditMode = false;
  customerId: string | null = null;
  loading = false;
  error: string | null = null;
  today: string;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {
      this.today = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      first_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
          this.noRepeatedCharsValidator()
        ]
      ],

      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
          this.noRepeatedCharsValidator()
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ],

      phone: [
        '',
        [
          Validators.pattern(/^\+?[0-9]{10,15}$/)
        ]
      ],

      birth_date: ['']
    });

    this.customerId = this.route.snapshot.paramMap.get('id');

    if (this.customerId === 'new') {
      this.customerId = null;
    }

    if (this.customerId) {
      this.isEditMode = true;

      // En edicion NO se permite modificar email ni password
      this.customerForm.get('email')?.disable();
      this.customerForm.get('password')?.disable();
      this.customerForm.get('password')?.clearValidators();
      this.customerForm.get('password')?.updateValueAndValidity();

      this.loadCustomer(this.customerId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Validador personalizado para caracteres repetidos
  private noRepeatedCharsValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const repeatedPattern = /(.)\1{2,}/;
      if (repeatedPattern.test(value)) {
        return { repeatedChars: 'No puede tener 3 o mas letras iguales consecutivas' };
      }

      return null;
    };
  }

  // Metodo para filtrar input del telefono en tiempo real
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Solo permitir numeros y + al inicio
    value = value.replace(/[^\d+]/g, '');

    // Solo permitir + al inicio
    if (value.indexOf('+') > 0) {
      value = value.replace(/\+/g, '');
    }

    // Si hay multiples +, dejar solo uno al inicio
    const parts = value.split('+');
    if (parts.length > 2) {
      value = '+' + parts.slice(1).join('');
    }

    // Actualizar el valor
    input.value = value;
    this.customerForm.get('phone')?.setValue(value, { emitEvent: false });
  }

  loadCustomer(id: string): void {
    this.loading = true;

    this.subscription.add(
      this.customerService.getCustomer(id).subscribe({
        next: (customer: Customer | null) => {
          if (!customer) {
            this.loading = false;
            this.showError('Cliente no encontrado');
            return;
          }

          this.customerForm.patchValue({
            email: customer.email,
            first_name: customer.first_name,
            last_name: customer.last_name,
            phone: customer.phone || '',
            birth_date: customer.birth_date || ''
          });

          this.loading = false;
        },
        error: () => {
          this.error = 'Error cargando datos del cliente. Por favor, reintente.';
          this.loading = false;
        }
      })
    );
  }

  onSubmit(): void {

    if (this.customerForm.invalid) {
      this.markFormGroupTouched(this.customerForm);
      return;
    }

    this.loading = true;
    this.error = null;

    // Limpiar errores previos del backend
    Object.keys(this.customerForm.controls).forEach(key => {
      const control = this.customerForm.get(key);
      const currentErrors = control?.errors;
      
      if (currentErrors && currentErrors['backend']) {
        delete currentErrors['backend'];
        control?.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
      }
    });

    let request;

    if (this.isEditMode && this.customerId) {
      request = this.customerService.updateCustomer(
        this.customerId,
        this.buildUpdatePayload()
      );
    } else {
      request = this.customerService.addCustomer(
        this.buildCreatePayload()
      );
    }

    this.subscription.add(
      request.subscribe({
        next: (customer) => {
          this.showSuccess(`Cliente ${this.isEditMode ? 'actualizado' : 'creado'} correctamente.`);
          this.loading = false;

          if (customer?.id) {
            this.router.navigate(['/customers', customer.id]);
          } else {
            this.router.navigate(['/customers']);
          }
        },
        error: (err: any) => {
          this.loading = false;

          // Error de validacion de Zod
          if (err.error?.error?.code === 'VALIDATION_ERROR') {
            this.applyBackendErrors(err.error.error.details);
            this.showError('Por favor, corrige los errores en el formulario.');
            return;
          }

          // Email duplicado
          if (err.error?.error?.code === 'EMAIL_DUPLICATE') {
            this.customerForm.get('email')?.setErrors({
              backend: 'El email ya esta registrado'
            });
            this.showError('El email ya esta registrado.');
            return;
          }

          // Error generico
          this.showError('Error procesando la solicitud. Por favor, reintente.');
        }
      })
    );
  }

  // Construir payload para crear (solo campos permitidos)
  private buildCreatePayload(): CreateCustomerDTO {
    const form = this.customerForm.value;
    
    const payload: CreateCustomerDTO = {
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      password: form.password
    };

    if (form.phone) payload.phone = form.phone;
    if (form.birth_date) payload.birth_date = form.birth_date;

    return payload;
  }

  // Construir payload para actualizar (solo campos modificables)
  private buildUpdatePayload(): UpdateCustomerDTO {
    const form = this.customerForm.getRawValue();

    const payload: UpdateCustomerDTO = {};

    if (form.first_name) payload.first_name = form.first_name;
    if (form.last_name) payload.last_name = form.last_name;
    if (form.phone) payload.phone = form.phone;
    if (form.birth_date) payload.birth_date = form.birth_date;

    return payload;
  }

  // Aplicar errores del backend a los campos
  private applyBackendErrors(details: any[]): void {
    details.forEach(detail => {
      const control = this.customerForm.get(detail.field);
      if (control) {
        control.setErrors({
          backend: detail.message
        });
        control.markAsTouched();
      }
    });
  }

  // Marcar todos los campos como tocados para mostrar errores
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
```

### src/app/customers/pages/customer-form/customer-form.html

```html
<div class="table-container">

  <div class="table-header">
    <h2>{{ isEditMode ? 'Editar Cliente' : 'Nuevo Cliente' }}</h2>
    <p class="subtitle">Completa la informacion del cliente para continuar</p>
  </div>

  <mat-card class="form-card mat-elevation-z4">

    <form [formGroup]="customerForm" (ngSubmit)="onSubmit()" class="modern-form">

      <mat-card-content>

        <div *ngIf="error" class="error-message">
          <mat-icon>error</mat-icon>
          {{ error }}
        </div>

        <div class="form-grid">

          <!-- EMAIL -->
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput 
                   type="email" 
                   formControlName="email"
                   placeholder="ejemplo@mail.com">

            <mat-icon matPrefix>email</mat-icon>

            <mat-error *ngIf="customerForm.get('email')?.hasError('required')">
              El email es obligatorio
            </mat-error>

            <mat-error *ngIf="customerForm.get('email')?.hasError('email')">
              Email invalido
            </mat-error>

            <mat-error *ngIf="customerForm.get('email')?.hasError('backend')">
              {{ customerForm.get('email')?.getError('backend') }}
            </mat-error>
          </mat-form-field>

          <!-- PASSWORD -->
          <mat-form-field appearance="outline">
            <mat-label>Contrasena</mat-label>
            <input matInput
                   type="password"
                   formControlName="password"
                   placeholder="********">

            <mat-icon matPrefix>lock</mat-icon>

            <mat-hint *ngIf="!isEditMode">
              Minimo 8 caracteres, incluir mayuscula, minuscula y numero
            </mat-hint>

            <mat-error *ngIf="!isEditMode && customerForm.get('password')?.hasError('required')">
              La contrasena es obligatoria
            </mat-error>

            <mat-error *ngIf="customerForm.get('password')?.hasError('minlength')">
              Debe tener al menos 8 caracteres
            </mat-error>

            <mat-error *ngIf="customerForm.get('password')?.hasError('pattern')">
              Debe incluir mayuscula, minuscula y numero
            </mat-error>

            <mat-error *ngIf="customerForm.get('password')?.hasError('backend')">
              {{ customerForm.get('password')?.getError('backend') }}
            </mat-error>
          </mat-form-field>

          <!-- NOMBRE -->
          <mat-form-field appearance="outline">
            <mat-label>Nombre</mat-label>
            <input matInput 
                   type="text" 
                   formControlName="first_name"
                   placeholder="Juan">

            <mat-icon matPrefix>person</mat-icon>

            <mat-error *ngIf="customerForm.get('first_name')?.hasError('required')">
              El nombre es obligatorio
            </mat-error>

            <mat-error *ngIf="customerForm.get('first_name')?.hasError('minlength')">
              Debe tener al menos 2 caracteres
            </mat-error>

            <mat-error *ngIf="customerForm.get('first_name')?.hasError('maxlength')">
              No puede exceder 50 caracteres
            </mat-error>

            <mat-error *ngIf="customerForm.get('first_name')?.hasError('pattern')">
              Solo puede contener letras
            </mat-error>

            <mat-error *ngIf="customerForm.get('first_name')?.hasError('repeatedChars')">
              {{ customerForm.get('first_name')?.getError('repeatedChars') }}
            </mat-error>

            <mat-error *ngIf="customerForm.get('first_name')?.hasError('backend')">
              {{ customerForm.get('first_name')?.getError('backend') }}
            </mat-error>
          </mat-form-field>

          <!-- APELLIDO -->
          <mat-form-field appearance="outline">
            <mat-label>Apellido</mat-label>
            <input matInput 
                   type="text" 
                   formControlName="last_name"
                   placeholder="Perez">

            <mat-icon matPrefix>badge</mat-icon>

            <mat-error *ngIf="customerForm.get('last_name')?.hasError('required')">
              El apellido es obligatorio
            </mat-error>

            <mat-error *ngIf="customerForm.get('last_name')?.hasError('minlength')">
              Debe tener al menos 2 caracteres
            </mat-error>

            <mat-error *ngIf="customerForm.get('last_name')?.hasError('maxlength')">
              No puede exceder 50 caracteres
            </mat-error>

            <mat-error *ngIf="customerForm.get('last_name')?.hasError('pattern')">
              Solo puede contener letras
            </mat-error>

            <mat-error *ngIf="customerForm.get('last_name')?.hasError('repeatedChars')">
              {{ customerForm.get('last_name')?.getError('repeatedChars') }}
            </mat-error>

            <mat-error *ngIf="customerForm.get('last_name')?.hasError('backend')">
              {{ customerForm.get('last_name')?.getError('backend') }}
            </mat-error>
          </mat-form-field>

          <!-- TELEFONO -->
          <mat-form-field appearance="outline">
            <mat-label>Telefono</mat-label>
            <input matInput 
                   type="tel" 
                   formControlName="phone"
                   (input)="onPhoneInput($event)"
                   placeholder="+1234567890"
                   maxlength="16">

            <mat-icon matPrefix>phone</mat-icon>

            <mat-hint>Formato: +1234567890 (10-15 digitos)</mat-hint>

            <mat-error *ngIf="customerForm.get('phone')?.hasError('pattern')">
              El telefono debe tener entre 10 y 15 digitos
            </mat-error>

            <mat-error *ngIf="customerForm.get('phone')?.hasError('backend')">
              {{ customerForm.get('phone')?.getError('backend') }}
            </mat-error>
          </mat-form-field>

          <!-- FECHA DE NACIMIENTO -->
          <mat-form-field appearance="outline">
            <mat-label>Fecha de nacimiento</mat-label>
            <input matInput 
                   type="date" 
                   formControlName="birth_date"
                   max="{{ today }}">

            <mat-icon matPrefix>cake</mat-icon>

            <mat-hint>Opcional</mat-hint>

            <mat-error *ngIf="customerForm.get('birth_date')?.hasError('backend')">
              {{ customerForm.get('birth_date')?.getError('backend') }}
            </mat-error>
          </mat-form-field>

        </div>

      </mat-card-content>

      <mat-card-actions align="end">
        <button mat-button 
                type="button" 
                (click)="onCancel()"
                [disabled]="loading">
          <mat-icon>cancel</mat-icon>
          Cancelar
        </button>

        <button mat-raised-button
                color="primary"
                type="submit"
                [disabled]="customerForm.invalid || loading">

          <mat-spinner 
            *ngIf="loading" 
            diameter="20" 
            style="display: inline-block; margin-right: 8px;">
          </mat-spinner>

          <mat-icon *ngIf="!loading">{{ isEditMode ? 'save' : 'add' }}</mat-icon>
          {{ isEditMode ? 'Guardar Cambios' : 'Crear Cliente' }}
        </button>
      </mat-card-actions>

    </form>

  </mat-card>

  <div *ngIf="loading" class="loading-shade">
    <mat-spinner diameter="60"></mat-spinner>
    <p>{{ isEditMode ? 'Actualizando...' : 'Creando...' }}</p>
  </div>

</div>
```

### src/app/customers/pages/customer-form/customer-form.css

```css
.table-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 0 16px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 8px;
}

.table-header h2 {
  margin: 0;
  color: #3f51b5;
  font-size: 1.8rem;
  font-weight: 500;
}

.form-card {
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.service-form {
  display: block;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;
  margin: 0;
}

mat-form-field {
  width: 100%;
}

.full-width {
  grid-column: 1 / -1;
}

.mat-mdc-form-field {
  --mdc-outlined-text-field-container-shape: 8px;
}


.loading-shade {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}


mat-card-actions {
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #eee;
}

button mat-icon {
  margin-right: 8px;
}

.error-message {
  background-color: #f44336;
  color: white;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 4px;
  font-weight: 500;
}
```

### src/app/customers/pages/customer-form/customer-form.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerForm } from './customer-form';

describe('CustomerForm', () => {
  let component: CustomerForm;
  let fixture: ComponentFixture<CustomerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### src/app/customers/pages/customer-detail/customer-detail.ts

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../shared/customer.service';
import { Customer } from '../../shared/customer';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-detail',
  imports: [MaterialModule, RouterModule, TitleCasePipe, UpperCasePipe, DatePipe, CommonModule],
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
})
export class CustomerDetail implements OnInit, OnDestroy {
  customer: Customer | null = null;
  loading = true;
  error: string | null = null
  private subscription: Subscription = new Subscription();
  dataSource: Customer[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
   private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomer(id);
    }
  }

  loadCustomer(id: string): void {
    this.loading = true;
    this.subscription.add(
      this.customerService.getCustomer(id).subscribe({
        next: (data: Customer | null) => {
          this.customer = data;
          this.loading = false;
        },
         error: (err: any) => {
          this.error = 'Error al cargar el cliente. Por favor, intentalo de nuevo.';
          this.loading = false;
        },
        complete: () => {
        }
      })
    );
  }

 deleteCustomer(id: string): void {
  if (!confirm('Seguro que queres eliminar este cliente?')) return;

  this.loading = true;

  this.customerService.deleteCustomer(id).subscribe(result => {
    this.loading = false;


    if (result.success && result.status === 204) {
      this.snackBar.open('Cliente eliminado correctamente', 'Cerrar', {
        duration: 3000
      });
      this.goBack(); 
      return;
    }


    if (result.status === 409) {
      this.snackBar.open(
        'No se puede eliminar: el cliente tiene reservas asociadas.',
        'Cerrar',
        { duration: 4000 }
      );
      return;
    }


    if (result.status === 404) {
      this.snackBar.open(
        'El cliente no existe.',
        'Cerrar',
        { duration: 4000 }
      );
      this.goBack(); 
      return;
    }

    this.snackBar.open(
      'Error al eliminar cliente.',
      'Cerrar',
      { duration: 4000 }
    );
  });
}



  goBack(): void {
    this.router.navigate(['/customers']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
```

### src/app/customers/pages/customer-detail/customer-detail.html

```html
<div class="table-container">
  <div class="table-header">
    <h2>Detalles del Cliente</h2>
    <button *ngIf="customer as c"
      mat-raised-button
      color="primary"
      [routerLink]="['/customers', c.id, 'edit']">
      <mat-icon>edit</mat-icon>
      Editar
    </button>
  </div>

  <mat-card *ngIf="customer as c" class="detail-card mat-elevation-z4">
    <mat-card-header>
      <mat-card-title>
        {{ c.first_name }} {{ c.last_name }}
      </mat-card-title>
    </mat-card-header>

    <mat-card-content>
      <div class="info-section">
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">{{ c.email }}</span>
        </div>

        <div class="info-row" *ngIf="c.phone">
          <span class="info-label">Telefono:</span>
          <span class="info-value">{{ c.phone }}</span>
        </div>

        <div class="info-row" *ngIf="c.birth_date">
          <span class="info-label">Fecha de nacimiento:</span>
          <span class="info-value">{{
            c.birth_date | date: 'longDate'
          }}</span>
        </div>

        <mat-divider class="divider"></mat-divider>

        <div class="info-row">
          <span class="info-label">Creado el:</span>
          <span class="info-value">{{
            c.created_at | date: 'medium'
          }}</span>
        </div>

        <div class="info-row">
          <span class="info-label">Ultima actualizacion:</span>
          <span class="info-value">{{
            c.updated_at | date: 'medium'
          }}</span>
        </div>
      </div>
    </mat-card-content>

    <mat-card-actions align = "end">
      <button mat-button (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
        Volver al listado
      </button>
      <button mat-button color="warn" (click)="deleteCustomer(c.id.toString())">
        <mat-icon>delete</mat-icon>
        Eliminar
      </button>
    </mat-card-actions>
  </mat-card>

  <div *ngIf="!customer && !loading" class="no-data">
    <p>No se encontro el cliente solicitado.</p>
  </div>

  <div *ngIf="loading" class="loading-shade">
    <mat-spinner></mat-spinner>
  </div>
</div>
```

### src/app/customers/pages/customer-detail/customer-detail.css

```css
.table-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.detail-card {
  padding: 1rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
}

.info-label {
  font-weight: 600;
  color: #555;
}

.info-value {
  color: #222;
}

.no-data {
  text-align: center;
  margin-top: 2rem;
  color: #888;
}

.loading-shade {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}
```

### src/app/customers/pages/customer-detail/customer-detail.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetail } from './customer-detail';

describe('CustomerDetail', () => {
  let component: CustomerDetail;
  let fixture: ComponentFixture<CustomerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Bookings Module

### src/app/bookings/shared/booking.ts

```typescript
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
```

### src/app/bookings/shared/booking.service.ts

```typescript
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
```

### src/app/bookings/pages/booking-list/booking-list.ts

```typescript
import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { OnInit } from '@angular/core';
import { Booking } from '../../shared/booking';
import { BookingService } from '../../shared/booking.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './booking-list.html',
  styleUrls: ['./booking-list.css'],
})
export class BookingListComponent implements OnInit {

  displayedColumns: string[] = ['client_name', 'service_name', 'booking_date', 'start_time', 'booking_status', 'actions'];
  dataSource: Booking[] = [];
  loading = true;
  error: string | null = null;

  constructor(private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) { }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3500,
      panelClass: ['snackbar-error']
    });
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.dataSource = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bookings', err);
        this.error = 'Error al cargar los turnos.';
        this.loading = false;
      }
    });
  }

  deleteBooking(id: string): void {
  if (!confirm('Seguro que queres eliminar este turno?')) return;

  this.loading = true;
  this.bookingService.deleteBooking(id).subscribe({
    next: (result) => {
      this.loading = false;
      if (result.success) {
        this.dataSource = this.dataSource.filter(b => String(b.id) !== String(id));
        return;
      }
      if (result.status === 409) {
        this.showError('Solo se pueden eliminar turnos cancelados');
      } else {
        this.showError('Error inesperado al intentar eliminar el turno');
      }
    },
    error: (err) => {
      this.loading = false;
      this.showError('Error de conexion al intentar eliminar');
    }
  });
}



}
```

### src/app/bookings/pages/booking-list/booking-list.html

```html
<div class="table-container">
  <div class="table-header">
    <h2>Turnos</h2>
  </div>

  <div *ngIf="loading" class="loading-shade">
    <mat-spinner></mat-spinner>
  </div>

  <div *ngIf="!loading && dataSource.length === 0" class="no-data">
    <p>No se encontraron turnos. Ingresa tu primea turno!</p>
  </div>

  <div *ngIf="error" class="error-box">
    {{ error }}
  </div>

  <div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <!-- Cliente -->
      <ng-container matColumnDef="client_name">
        <th mat-header-cell *matHeaderCellDef>Cliente</th>
        <td mat-cell *matCellDef="let booking">
          <a [routerLink]="['/bookings', booking.id]" class="booking-id">
            {{booking.client_name }}
          </a>
        </td>
      </ng-container>

      <!-- Servicio -->
      <ng-container matColumnDef="service_name">
        <th mat-header-cell *matHeaderCellDef>Servicio</th>
        <td mat-cell *matCellDef="let booking">
          <a [routerLink]="['/bookings', booking.id]" class="booking-id">
            {{booking.service_name }}
          </a>
        </td>
      </ng-container>

      <!-- Fecha -->
      <ng-container matColumnDef="booking_date">
        <th mat-header-cell *matHeaderCellDef>Fecha</th>
        <td mat-cell *matCellDef="let booking">{{booking.booking_date | date: 'dd/MM/yyyy' }}</td>
      </ng-container>

      <!-- Hora Inicio -->
      <ng-container matColumnDef="start_time">
        <th mat-header-cell *matHeaderCellDef>Hora Inicio</th>
        <td mat-cell *matCellDef="let booking">{{booking.start_time}}
        </td>
      </ng-container>

      <!-- Estado -->
      <ng-container matColumnDef="booking_status">
        <th mat-header-cell *matHeaderCellDef>Estado</th>
        <td mat-cell *matCellDef="let booking">
          <span class="status-badge" [ngClass]="booking.booking_status">
            {{ booking.booking_status | titlecase }}
          </span>
        </td>
      </ng-container>

      <!-- Acciones -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let booking" class="actions-cell">
          <button mat-icon-button color="primary"
                  [routerLink]="['/bookings', booking.id]"
                  matTooltip="Ver detalles">
            <mat-icon>visibility</mat-icon>
          </button>
          <button mat-icon-button color="warn"
                  (click)="deleteBooking(booking.id!)"
                  matTooltip="Eliminar reserva">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <!-- Header y filas -->
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <button mat-raised-button color="accent" routerLink="/bookings/new" class="add-button">
      <mat-icon>person_add</mat-icon>
      <span>Agregar Reserva</span>
    </button>
  </div>
</div>
```

### src/app/bookings/pages/booking-list/booking-list.css

```css
.snackbar-error {
  background-color: #d32f2f !important; 
  color: white !important;
}

.snackbar-success {
  background-color: #2e7d32 !important; 
  color: white !important;
}
.table-container {
	max-width: 1000px;
	margin: 20px auto;
	padding: 0 16px;
}

.table-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	padding: 0 8px;
}

.table-header h2 {
	margin: 0;
	color: #3f51b5;
	font-size: 1.8rem;
	font-weight: 500;
}

table.mat-elevation-z8 {
	width: 100%;
	border-collapse: separate;
}

.service-link {
	text-decoration: none;
	color: inherit;
}

.no-data {
	text-align: center;
	margin-top: 1rem;
	color: #888;
}

.loading-shade {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80px;
}

.add-button {
	margin-top: 16px;
}

.mat-column-description {
	max-width: 300px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
```

### src/app/bookings/pages/booking-list/booking-list.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListComponent } from './booking-list';

describe('BookingListComponent', () => {
  let component: BookingListComponent;
  let fixture: ComponentFixture<BookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### src/app/bookings/pages/booking-form/booking-form.ts

```typescript
import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Booking } from '../../shared/booking';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../shared/booking.service';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../customers/shared/customer.service';
import { ServiceService } from '../../../services/shared/service.service';
import { Service } from '../../../services/shared/service.interface';
import { Customer } from '../../../customers/shared/customer';
@Component({
  standalone: true,
  selector: 'app-booking-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css',
})
export class BookingForm {

  bookingForm!: FormGroup;
  isEditMode = false;
  bookingId: string | null = null;
  loading = false;
  error: string | null = null;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private customerService: CustomerService,
    private serviceService: ServiceService
  ) { }

  clients: Customer[] = [];

  services: Service[] = [];

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription.add(
      this.customerService.getCustomers().subscribe(data => this.clients = data)
    );
    this.subscription.add(
      this.serviceService.getServices().subscribe(data => this.services = data)
    );

    this.bookingForm = this.fb.group({
      client_id: ['', Validators.required],
      client_name: [''],
      service_id: ['', Validators.required],
      service_name: [''],
      booking_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      booking_status: ['', Validators.required]
    });

    this.bookingId = this.route.snapshot.paramMap.get('id');
    if (this.bookingId === 'new') this.bookingId = null;

    if (this.bookingId) {
      this.isEditMode = true;
      this.loadBooking(this.bookingId);
    }
  }

  loadBooking(id: string): void {
    this.loading = true;
    this.subscription.add(
      this.bookingService.getBooking(id).subscribe({
        next: (booking: Booking | null) => {
          if (booking) {
            this.bookingForm.patchValue({
              client_id: String(booking.client_id),
              service_id: booking.service_id,
              service_name: booking.service_name,
              booking_date: new Date(booking.booking_date).toISOString().split('T')[0],
              start_time: booking.start_time,
              end_time: booking.end_time,
              booking_status: booking.booking_status
            });
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error cargando turno';
          this.loading = false;
        }
      })
    );
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) return;

    if (this.isEditMode) {
      this.updateExistingBooking();
    } else {
      this.createBooking();
    }
  }

  createBooking(): void {
    this.loading = true;

    const selectedClient = this.clients.find(
      c => c.id === this.bookingForm.value.client_id
    );
    if (!selectedClient) {
      this.error = 'Cliente invalido';
      this.loading = false;
      return;
    }

    const selectedService = this.services.find(
      s => s.id === this.bookingForm.value.service_id
    );
    if (!selectedService) {
      this.error = 'Servicio invalido';
      this.loading = false;
      return;
    }

    const data = {
      ...this.bookingForm.value,
      client_name: selectedClient.name, 
      service_name: selectedService.name
    };

    this.subscription.add(
      this.bookingService.addBooking(data).subscribe({
        next: (booking) => {
          this.loading = false;
          if (booking) this.router.navigate(['/bookings', booking.id]);
        },
        error: (err) => {
          this.error = err.error?.message || 'Error creando turno';
          this.loading = false;
        }
      })
    );
  }

  deleteBooking(): void {
    if (!this.bookingId) return;
    if (!confirm('Seguro que deseas eliminar el turno?')) return;

    this.loading = true;

    this.subscription.add(
      this.bookingService.deleteBooking(this.bookingId).subscribe({
        next: (result) => {                          
          this.loading = false;
          if (result.success) this.router.navigate(['/bookings']); 
        },
        error: (err) => {
          this.error = err.error?.message || 'Error eliminando turno';
          this.loading = false;
        }
      })
    );
  }

  updateExistingBooking(): void {
  if (!this.bookingId) return;

  this.loading = true;
  const { client_name, service_name, ...data } = this.bookingForm.value;
  
  console.log('[UPDATE] ID:', this.bookingId, 'Data:', JSON.stringify(data));

  this.subscription.add(
    this.bookingService.updateBooking(this.bookingId, data).subscribe({
      next: (booking) => {
        this.loading = false;
        if (booking) this.router.navigate(['/bookings', booking.id]);
      },
      error: (err) => {
        this.error = err.error?.error?.message || 'Error actualizando turno'; 
        this.loading = false;
      }
    })
  );
}



  onCancel(): void {
    this.router.navigate(['/bookings']);
  }
}
```

### src/app/bookings/pages/booking-form/booking-form.html

```html
<div class="page-wrapper">

  <header class="page-header">
    <div>
      <h1>{{ isEditMode ? 'Editar Turno' : 'Nuevo Turno' }}</h1>
      <p class="subtitle">Completa la informacion del turno para continuar</p>
    </div>

    <button mat-stroked-button color="primary" (click)="onCancel()">
      <mat-icon>arrow_back</mat-icon>
      Volver
    </button>
  </header>

  <div *ngIf="error" class="error-message">
    {{ error }}
  </div>
  
  <mat-card class="modern-card mat-elevation-z3">
    
    <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="modern-form">

      <!-- Datos Reserva -->
      <section class="form-section">
        <h2 class="section-title">Datos del turno</h2>

        <div class="form-grid">

          <!-- Cliente -->
          <mat-form-field appearance="fill">
            <mat-label>Cliente</mat-label>
            <mat-select formControlName="client_id">
              <mat-option *ngFor="let c of clients" [value]="c.id">
                {{ c.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Servicio -->
          <mat-form-field appearance="fill">
            <mat-label>Servicio</mat-label>
            <mat-select formControlName="service_id">
              <mat-option *ngFor="let s of services" [value]="s.id">
                {{ s.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Estado -->
          <mat-form-field appearance="outline">
            <mat-label>Estado</mat-label>
            <mat-select formControlName="booking_status">
              <mat-option value="pending">Pendiente</mat-option>
              <mat-option value="confirmed">Confirmado</mat-option>
              <mat-option value="cancelled">Cancelado</mat-option>
              <mat-option value="completed">Completado</mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Fecha -->
          <mat-form-field appearance="outline">
            <mat-label>Fecha</mat-label>
            <input matInput type="date" formControlName="booking_date">
          </mat-form-field>

          <!-- Hora Inicio -->
          <mat-form-field appearance="outline">
            <mat-label>Hora Inicio</mat-label>
            <input matInput type="time" formControlName="start_time">
          </mat-form-field>

          <!-- Hora Fin -->
          <mat-form-field appearance="outline">
            <mat-label>Hora Finalizacion</mat-label>
            <input matInput type="time" formControlName="end_time">
          </mat-form-field>

        </div>
      </section>

      <div class="form-actions">
        <button mat-stroked-button type="button" (click)="onCancel()">
          Cancelar
        </button>

<button mat-raised-button
        color="primary"
        type="submit"
        [disabled]="bookingForm.invalid">
        <mat-icon>{{ isEditMode ? 'save' : 'add' }}</mat-icon>
  {{ isEditMode ? "Guardar Cambios" : "Crear Turno" }}
</button>

      </div>
      <div>{{ bookingForm.invalid ? 'INVALIDO' : 'VALIDO' }}</div>

      <button *ngIf="isEditMode"
        mat-raised-button
        color="warn"
        type="button"
        (click)="deleteBooking()">
    <mat-icon>delete</mat-icon>
    Eliminar
</button>


    </form>

  </mat-card>

  <div *ngIf="loading" class="loading-shade">
    <mat-spinner></mat-spinner>
  </div>

</div>
```

### src/app/bookings/pages/booking-form/booking-form.css

```css
.page-wrapper {
  max-width: 1100px;
  margin: 32px auto;
  padding: 0 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.page-header h1 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a237e;
}

.subtitle {
  margin: 4px 0 0;
  color: #5a5a5a;
  font-size: 1rem;
}

.modern-card {
  padding: 32px;
  border-radius: 20px;
  background: #fdfdfd;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #283593;
}

.form-section {
  margin-bottom: 32px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  gap: 16px;
}

.loading-shade {
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-shade .spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3f51b5;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}

.error-message {
  color: #d32f2f;
  background-color: #fdecea;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
}
```

### src/app/bookings/pages/booking-form/booking-form.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingForm } from './booking-form';

describe('BookingForm', () => {
  let component: BookingForm;
  let fixture: ComponentFixture<BookingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### src/app/bookings/pages/booking-detail/booking-detail.ts

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Subscription } from 'rxjs';
import { BookingService } from '../../shared/booking.service';
import { Booking } from '../../shared/booking';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-detail',
  imports: [MaterialModule, RouterModule, UpperCasePipe, DatePipe, CommonModule],
  templateUrl: './booking-detail.html',
  styleUrl: './booking-detail.css',
})
export class BookingDetail implements OnInit, OnDestroy {
  booking: Booking | null = null;
  loading = true;
  error: string | null = null
  private subscription: Subscription = new Subscription();
  dataSource: Booking[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBooking(id);
    }
  }


  loadBooking(id: string): void {
    this.loading = true;
    this.subscription.add(
      this.bookingService.getBooking(id).subscribe({
        next: (data: Booking | null) => {
          this.booking = data;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Error al cargar el turno. Por favor, intentalo de nuevo.';
          this.loading = false;
        },
        complete: () => {
        }
      })
    );
  }

  deleteBooking(id: string): void {
  this.bookingService.deleteBooking(id).subscribe({
    next: (result) => {
      if (result.success) {
        this.router.navigate(['/bookings']);
        return;
      }
      if (result.status === 409) {
        this.snackBar.open('Solo se pueden eliminar turnos cancelados', 'Cerrar', { duration: 4000 });
      } else {
        this.snackBar.open('Error inesperado al eliminar el turno', 'Cerrar', { duration: 4000 });
      }
    },
    error: (err) => {
      this.snackBar.open('Error de conexion al intentar eliminar', 'Cerrar', { duration: 4000 });
    }
  });
}

  goBack(): void {
    this.router.navigate(['/bookings']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
```

### src/app/bookings/pages/booking-detail/booking-detail.html

```html
<div class="table-container">
  <div class="table-header">
    <h2>Detalles del Turno</h2>
    <button *ngIf="booking as b"
      mat-raised-button
      color="primary"
      [routerLink]="['/bookings', b.id, 'edit']">
      <mat-icon>edit</mat-icon>
      Editar
    </button>
  </div>

<mat-card *ngIf="booking as b" class="detail-card mat-elevation-z4">
  <mat-card-header>
    <mat-card-title>
      Cliente: {{ b.client_name }}
    </mat-card-title>

    <mat-card-subtitle>
      Estado:
      <span
        [ngClass]="{
          'status-confirmed': b.booking_status === 'confirmed',
          'status-pending': b.booking_status === 'pending',
          'status-cancelled': b.booking_status === 'cancelled',
          'status-completed': b.booking_status === 'completed'
        }"
      >
        {{ b.booking_status | uppercase }}
      </span>
    </mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="info-section">
      
      <!-- Tratamiento -->
      <div class="info-row">
        <span class="info-label">Tratamiento:</span>
        <span class="info-value">{{ b.treatment_id}}</span>
      </div>
      <!-- Fecha -->
      <div class="info-row" *ngIf="b.booking_date">
        <span class="info-label">Fecha:</span>
        <span class="info-value">
          {{ b.booking_date | date: 'dd/MM/yyyy' }}
        </span>
      </div>
      <!-- Hora Inicio -->
      <div class="info-row">
        <span class="info-label">Hora Inicio:</span>
        <span class="info-value">{{ b.start_time }}</span>
      </div>
      <!-- Fecha Creacion -->
      <div class="info-row">
        <span class="info-label">Creado el:</span>
        <span class="info-value">{{ b.created_at | date: 'medium' }}</span>
      </div>

      <!-- Fecha ultima actualizacion -->
      <div class="info-row">
        <span class="info-label">Ultima actualizacion:</span>
        <span class="info-value">{{ b.updated_at | date: 'medium' }}</span>
      </div>

    </div>
  </mat-card-content>

  <mat-card-actions align="end">
    <button mat-button (click)="goBack()">
      <mat-icon>arrow_back</mat-icon>
      Volver al listado
    </button>
    <button mat-button color="warn" (click)="deleteBooking(b.id.toString())">
      <mat-icon>delete</mat-icon>
      Eliminar
    </button>
  </mat-card-actions>
</mat-card>
  <div *ngIf="!booking && !loading" class="no-data">
    <p>No se encontro la reserva solicitada.</p>
  </div>

  <div *ngIf="loading" class="loading-shade">
    <mat-spinner></mat-spinner>
  </div>

</div>
```

### src/app/bookings/pages/booking-detail/booking-detail.css

```css
.table-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.detail-card {
  padding: 1rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
}

.info-label {
  font-weight: 600;
  color: #555;
}

.info-value {
  color: #222;
}

.status-completed {
  color: #2e7d32;
  font-weight: bold;
}

.status-confirmed {
  color: #ca8224;
  font-weight: bold;
}

.status-pending {
  color: #f9a825;
  font-weight: bold;
}

.status-cancelled {
  color: #c62828;
  font-weight: bold;
}

.no-data {
  text-align: center;
  margin-top: 2rem;
  color: #888;
}

.loading-shade {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}
```

### src/app/bookings/pages/booking-detail/booking-detail.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetail } from './booking-detail';

describe('BookingDetail', () => {
  let component: BookingDetail;
  let fixture: ComponentFixture<BookingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Services Module

### src/app/services/shared/service.interface.ts

```typescript
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
```

### src/app/services/shared/service.service.ts

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './service.interface';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiBase = 'http://localhost:3000/api/services';

  constructor(private http: HttpClient) { }

  private normalizeService(s: any): Service {
    return {
      id: s.id !== undefined && s.id !== null ? Number(s.id) : undefined,
      name: s.name || '',
      description: s.description || '',
      price: typeof s.price === 'string' ? parseFloat(s.price) : s.price || 0,
      duration: s.duration || s.duration || 0,
      category_id: s.category_id,
      image_url: s.image_url,
      created_at: s.created_at || new Date().toISOString(),
      updated_at: s.updated_at || new Date().toISOString(),
    } as Service;
  }

  private normalizeServicesArray(payload: any): Service[] {
    const arr = Array.isArray(payload) ? payload : payload?.data ?? [];
    return (arr ?? []).map((s: any) => this.normalizeService(s));
  }

  getServices() {
    const url = `${this.apiBase}`;
    return this.http.get<any>(url).pipe(
      map((response) => this.normalizeServicesArray(response))
    );
  }

  addService(service: Omit<Service, 'id'>) {
    const url = `${this.apiBase}`;
    return this.http.post<any>(url, service).pipe(
      map((res) => {
        const payload = res?.data ?? res;
        return payload ? this.normalizeService(payload) : null;
      })
    );
  }

  getService(id: string) {
    const url = `${this.apiBase}/${id}`;
    return this.http.get<any>(url).pipe(
      map((res) => {
        const payload = res?.data ?? res;
        return payload ? this.normalizeService(payload) : null;
      })
    );
  }

  updateService(id: string, service: Partial<Omit<Service, 'id'>>) {
    const url = `${this.apiBase}/${id}`;
    return this.http.put<any>(url, service).pipe(
      map((res) => {
        const payload = res?.data ?? res;
        return payload ? this.normalizeService(payload) : null;
      })
    );
  }

  deleteService(id: string): Observable<boolean> {
    const url = `${this.apiBase}/${id}`;
    return this.http.delete<any>(url).pipe(
      map(() => true)
    );
  }

}
```

### src/app/services/shared/service.spec.ts

```typescript
import { TestBed } from '@angular/core/testing';

import { Service } from './service';

describe('Service', () => {
  let service: Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

### src/app/services/pages/service-list/service-list.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Service } from '../../shared/service.interface';
import { ServiceService } from '../../shared/service.service';
import { MaterialModule } from '../../../shared/materialModule';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './service-list.html',
  styleUrls: ['./service-list.css'],
})
export class ServiceList implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'price', 'duration', 'actions'];
  dataSource: Service[] = [];
  loading = true;
  error: string | null = null;


  constructor(private serviceService: ServiceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.error = null;

    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.dataSource = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading services', err);
        this.error = 'Error al cargar los servicios.';
        this.loading = false;
      }
    });
  }

  deleteService(id: string): void {
    if (confirm('Seguro que queres eliminar este servicio?')) {
      this.loading = true;
      this.serviceService.deleteService(id).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(s => String(s.id) !== String(id));
          this.loading = false;
          this.snackBar.open('Servicio eliminado correctamente', 'Cerrar', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error('Error eliminando servicio', err);
          this.loading = false;
          if (err.status === 409) {
            this.snackBar.open('No se puede eliminar: el servicio tiene turnos asociados.', 'Cerrar', {
              duration: 5000,
            });
          } else {
            this.error = 'No se pudo eliminar el servicio.';
            this.snackBar.open('Error al eliminar el servicio', 'Cerrar', {
              duration: 3000,
            });
          }
        }
      });
    }
  }

}
```

### src/app/services/pages/service-list/service-list.html

```html
<div class="table-container">
  <div class="table-header">
    <h2>Servicios</h2>
  </div>

  <div class="loading-shade" *ngIf="loading">
    <mat-spinner></mat-spinner>
  </div>

  <div class="no-data" *ngIf="!loading && dataSource.length === 0">
    <p>No se encontraron servicios. Crea tu primer servicio!</p>
  </div>

  <div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">


      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Nombre</th>
        <td mat-cell *matCellDef="let service">
          <a [routerLink]="['/services', service.id]" class="service-link">
            {{ service.name }}
          </a>
        </td>
      </ng-container>


      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef>Descripcion</th>
        <td mat-cell *matCellDef="let service">{{ service.description }}</td>
      </ng-container>


      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef>Precio</th>
        <td mat-cell *matCellDef="let service">${{ service.price | number:'1.2-2' }}</td>
      </ng-container>


      <ng-container matColumnDef="duration">
        <th mat-header-cell *matHeaderCellDef>Duracion (min)</th>
        <td mat-cell *matCellDef="let service">{{ service.duration }}</td>
      </ng-container>


      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let service">
          <button mat-icon-button color="primary" [routerLink]="['/services', service.id]" matTooltip="Ver detalles">
            <mat-icon>visibility</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="deleteService(service.id!.toString())"
            matTooltip="Eliminar servicio">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>


      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <button mat-raised-button color="accent" routerLink="/services/new" class="add-button">
      <mat-icon>add</mat-icon>
      <span>Crear Servicio</span>
    </button>
  </div>
</div>
```

### src/app/services/pages/service-list/service-list.css

```css
.table-container {
	max-width: 1000px;
	margin: 20px auto;
	padding: 0 16px;
}

.table-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	padding: 0 8px;
}

.table-header h2 {
	margin: 0;
	color: #3f51b5;
	font-size: 1.8rem;
	font-weight: 500;
}

table.mat-elevation-z8 {
	width: 100%;
	border-collapse: separate;
}

.service-link {
	text-decoration: none;
	color: inherit;
}

.no-data {
	text-align: center;
	margin-top: 1rem;
	color: #888;
}

.loading-shade {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80px;
}

.actions-cell {
	display: flex;
	gap: 8px;
	align-items: center;
}

.add-button {
	margin-top: 16px;
}

.mat-column-description {
	max-width: 300px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
```

### src/app/services/pages/service-list/service-list.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceList } from './service-list';

describe('ServiceList', () => {
  let component: ServiceList;
  let fixture: ComponentFixture<ServiceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### src/app/services/pages/service-form/service-form.ts

```typescript
import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materialModule';
import { Service } from '../../shared/service.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../shared/service.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-form',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './service-form.html',
  styleUrl: './service-form.css',
})
export class ServiceForm {

  serviceForm!: FormGroup;
  isEditMode = false;
  serviceId: string | null = null;
  loading = false;
  error: string | null = null;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService) {

    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required]
    });

    this.serviceId = this.route.snapshot.paramMap.get('id');
    if (this.serviceId === 'new') {
      this.serviceId = null;
    }

    if (this.serviceId) {
      this.isEditMode = true;
      this.loadService(this.serviceId);
    }
  }

  loadService(id: string): void {
    this.loading = true;
    this.subscription.add(
      this.serviceService.getService(id).subscribe({
        next: (service: Service | null) => {
          if (!service) {
            this.loading = false;
            return;
          }

          this.serviceForm.patchValue({
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration
          });

          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Error cargando. Reintente.';
          this.loading = false;
        }
      })
    );
  }

  onSubmit(): void {
    console.log('onSubmit called');
    console.log('Form valid:', this.serviceForm.valid);
    console.log('Form value:', this.serviceForm.value);
    console.log('Form errors:', this.serviceForm.errors);

    if (this.serviceForm.valid) {
      this.loading = true;
      this.error = null;

      const formValue = this.serviceForm.value;
      const serviceData = {
        ...formValue,
        price: Number(formValue.price),
        duration: Number(formValue.duration),
        category_id: 1,
        image_url: null
      };

      console.log('Sending service data:', serviceData);

      let request;

      if (this.isEditMode && this.serviceId) {
        request = this.serviceService.updateService(this.serviceId, serviceData);
      } else {
        request = this.serviceService.addService(serviceData as Omit<Service, 'id'>);
      }

      this.subscription.add(
        request.subscribe({
          next: (service) => {
            console.log('Service saved successfully:', service);
            if (!service) {

              this.error = 'Unexpected error: No data returned.';
              this.loading = false;
              return;
            }
            this.loading = false;
            this.router.navigate(['/services', service.id]);
          },
          error: (err: any) => {
            console.error('Error saving service:', err);
            this.error = `Error ${this.isEditMode ? 'updating' : 'adding'} service. ${err.message || 'Please try again.'}`;
            this.loading = false;
          }
        })
      );
    } else {
      console.warn('Form is invalid');
      Object.keys(this.serviceForm.controls).forEach(key => {
        const controlErrors = this.serviceForm.get(key)?.errors;
        if (controlErrors) {
          console.warn('Key control: ' + key + ', errors: ' + JSON.stringify(controlErrors));
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/services']);
  }
}
```

### src/app/services/pages/service-form/service-form.html

```html
<div class="table-container">
  <div class="table-header">
    <h2>{{ isEditMode ? 'Editar Servicio' : 'Nuevo Servicio' }}</h2>
  </div>

  <mat-card class="form-card mat-elevation-z4">
    <form [formGroup]="serviceForm" (ngSubmit)="onSubmit()" class="service-form">
      <mat-card-content>

        <div class="form-grid">

          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>


          <mat-form-field appearance="outline">
            <mat-label>Nombre</mat-label>
            <input matInput type="text" formControlName="name" required>
            <mat-error *ngIf="serviceForm.get('name')?.hasError('required')">
              El nombre es obligatorio
            </mat-error>
          </mat-form-field>


          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Descripcion</mat-label>
            <textarea matInput formControlName="description" required></textarea>
            <mat-error *ngIf="serviceForm.get('description')?.hasError('required')">
              La descripcion es obligatoria
            </mat-error>
          </mat-form-field>


          <mat-form-field appearance="outline">
            <mat-label>Precio</mat-label>
            <input matInput type="number" formControlName="price" required>
            <mat-error *ngIf="serviceForm.get('price')?.hasError('required')">
              El precio es obligatorio
            </mat-error>
          </mat-form-field>


          <mat-form-field appearance="outline">
            <mat-label>Duracion (minutos)</mat-label>
            <input matInput type="number" formControlName="duration" required>
            <mat-error *ngIf="serviceForm.get('duration')?.hasError('required')">
              La duracion es obligatoria
            </mat-error>
          </mat-form-field>

        </div>

      </mat-card-content>

      <mat-card-actions align="end">
        <button mat-button type="button" (click)="onCancel()">
          <mat-icon>cancel</mat-icon>
          Cancelar
        </button>

        <button mat-raised-button color="primary" type="submit" [disabled]="!serviceForm.valid">
          <mat-icon>{{ isEditMode ? 'save' : 'add' }}</mat-icon>
          {{ isEditMode ? 'Actualizar' : 'Crear' }}
        </button>
      </mat-card-actions>

    </form>
  </mat-card>

  <div class="loading-shade" *ngIf="loading">
    <mat-spinner></mat-spinner>
  </div>
</div>
```

### src/app/services/pages/service-form/service-form.css

```css
.table-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 0 16px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 8px;
}

.table-header h2 {
  margin: 0;
  color: #3f51b5;
  font-size: 1.8rem;
  font-weight: 500;
}

.form-card {
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.service-form {
  display: block;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;
  margin: 0;
}

mat-form-field {
  width: 100%;
}

.full-width {
  grid-column: 1 / -1;
}

.mat-mdc-form-field {
  --mdc-outlined-text-field-container-shape: 8px;
}

/* Loading */
.loading-shade {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Acciones del formulario */
mat-card-actions {
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #eee;
}

button mat-icon {
  margin-right: 8px;
}

.error-message {
  background-color: #f44336;
  color: white;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 4px;
  font-weight: 500;
}
```

### src/app/services/pages/service-form/service-form.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceForm } from './service-form';

describe('ServiceForm', () => {
  let component: ServiceForm;
  let fixture: ComponentFixture<ServiceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### src/app/services/pages/service-detail/service-detail.ts

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../shared/materialModule';
import { Subscription } from 'rxjs';
import { ServiceService } from '../../shared/service.service';
import { Service } from '../../shared/service.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-detail',
  imports: [MaterialModule, RouterModule, DatePipe, CommonModule],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css',
})
export class ServiceDetail implements OnInit, OnDestroy {
  service: Service | null = null;
  loading = true;
  error: string | null = null
  private subscription: Subscription = new Subscription();
  dataSource: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadService(id);
    }
  }

  loadService(id: string): void {
    this.loading = true;
    this.subscription.add(
      this.serviceService.getService(id).subscribe({
        next: (data: Service | null) => {
          this.service = data;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Error al cargar el servicio. Por favor, intentalo de nuevo.';
          this.loading = false;
        },
        complete: () => {
        }
      })
    );
  }

  deleteService(id: number | string): void {
    if (confirm('Seguro que queres eliminar este servicio?')) {
      this.loading = true;
      this.serviceService.deleteService(id.toString()).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open('Servicio eliminado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/services']);
        },
        error: (err) => {
          console.error('Error eliminando servicio', err);
          this.loading = false;
          if (err.status === 409) {
            this.snackBar.open('No se puede eliminar: el servicio tiene turnos asociados.', 'Cerrar', {
              duration: 5000,
            });
          } else {
            this.error = 'No se pudo eliminar el servicio.';
            this.snackBar.open('Error al eliminar el servicio', 'Cerrar', {
              duration: 3000,
            });
          }
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/services']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
```

### src/app/services/pages/service-detail/service-detail.html

```html
<div class="table-container">
  <div class="table-header">
    <h2>Detalles del Servicio</h2>
    <button mat-raised-button color="primary" [routerLink]="['/services', service.id, 'edit']" *ngIf="service">
      <mat-icon>edit</mat-icon>
      Editar
    </button>
  </div>

  <mat-card class="detail-card mat-elevation-z4" *ngIf="service">
    <mat-card-header>
      <mat-card-title>
        {{ service.name }}
      </mat-card-title>
    </mat-card-header>

    <mat-card-content>
      <div class="info-section">
        <div class="info-row">
          <span class="info-label">Descripcion:</span>
          <span class="info-value">{{ service.description }}</span>
        </div>

        <div class="info-row">
          <span class="info-label">Precio:</span>
          <span class="info-value">${{ service.price | number: '1.2-2' }}</span>
        </div>

        <div class="info-row">
          <span class="info-label">Duracion:</span>
          <span class="info-value">{{ service.duration }} minutos</span>
        </div>

        <mat-divider class="divider"></mat-divider>

        <div class="info-row">
          <span class="info-label">Creado el:</span>
          <span class="info-value">{{
            service.created_at | date: 'medium'
            }}</span>
        </div>

        <div class="info-row">
          <span class="info-label">Ultima actualizacion:</span>
          <span class="info-value">{{
            service.updated_at | date: 'medium'
            }}</span>
        </div>
      </div>
    </mat-card-content>

    <mat-card-actions align="end">
      <button mat-button (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
        Volver al listado
      </button>
      <button mat-button color="warn" (click)="deleteService(service.id)">
        <mat-icon>delete</mat-icon>
        Eliminar
      </button>
    </mat-card-actions>
  </mat-card>

  <div class="no-data" *ngIf="!service && !loading">
    <p>No se encontro el servicio solicitado.</p>
  </div>

  <div class="loading-shade" *ngIf="loading">
    <mat-spinner></mat-spinner>
  </div>
</div>
```

### src/app/services/pages/service-detail/service-detail.css

```css
.table-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.detail-card {
  padding: 1rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
}

.info-label {
  font-weight: 600;
  color: #555;
}

.info-value {
  color: #222;
}

.no-data {
  text-align: center;
  margin-top: 2rem;
  color: #888;
}

.loading-shade {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}

.divider {
  margin: 1rem 0;
}
```

### src/app/services/pages/service-detail/service-detail.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetail } from './service-detail';

describe('ServiceDetail', () => {
  let component: ServiceDetail;
  let fixture: ComponentFixture<ServiceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Estructura de Archivos

```
turno-ya-frontend/
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── public/
│   ├── favicon.ico
│   └── turnos-ya-logo.jpg
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css
    ├── custom-theme.scss
    └── app/
        ├── app.ts
        ├── app.html
        ├── app.css
        ├── app.config.ts
        ├── app.routes.ts
        ├── app.spec.ts
        ├── shared/
        │   └── materialModule.ts
        ├── home/
        │   ├── home.ts
        │   ├── home.html
        │   ├── home.css
        │   └── home.spec.ts
        ├── customers/
        │   ├── shared/
        │   │   ├── customer.ts
        │   │   ├── customer.dto.ts
        │   │   └── customer.service.ts
        │   └── pages/
        │       ├── customer-list/
        │       ├── customer-form/
        │       └── customer-detail/
        ├── bookings/
        │   ├── shared/
        │   │   ├── booking.ts
        │   │   └── booking.service.ts
        │   └── pages/
        │       ├── booking-list/
        │       ├── booking-form/
        │       └── booking-detail/
        └── services/
            ├── shared/
            │   ├── service.interface.ts
            │   ├── service.service.ts
            │   └── service.spec.ts
            └── pages/
                ├── service-list/
                ├── service-form/
                └── service-detail/
```
