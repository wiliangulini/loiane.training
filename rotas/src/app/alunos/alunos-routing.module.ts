import { AlunosComponent } from './alunos.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosGuard } from '../guards/alunos.guard';
import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

const alunosRoutes = [
  {path: '', component: AlunosComponent,
    canActivateChild: [AlunosGuard],
    children: [
      {path: 'novo', component: AlunoFormComponent},
      {path: ':id', component: AlunoDetalheComponent,
        resolve: { aluno: AlunoDetalheResolver }
      },
      {path: ':id/editar', component: AlunoFormComponent,
        canDeactivate: [AlunosDeactivateGuard]
      },
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(alunosRoutes)
   ],
  exports: [RouterModule],
  providers: [],
})
export class AlunosRoutingModule {}
