import { CursosListaComponent } from './cursos/cursos-lista/cursos-lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cursos' },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then((x) => x.CursosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
