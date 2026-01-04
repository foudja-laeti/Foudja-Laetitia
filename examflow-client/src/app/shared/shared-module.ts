import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components partagés (à créer si nécessaire)
// import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
// import { StatsCardComponent } from './components/stats-card/stats-card.component';

@NgModule({
  declarations: [
    // LoadingSpinnerComponent,
    // StatsCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    // LoadingSpinnerComponent,
    // StatsCardComponent
  ]
})
export class SharedModule { }
