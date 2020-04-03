import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'auth//pages/index', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth//pages/index' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });