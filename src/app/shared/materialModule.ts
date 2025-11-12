import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';


export const MaterialModule = [
  MatToolbarModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatDivider
] as const;
