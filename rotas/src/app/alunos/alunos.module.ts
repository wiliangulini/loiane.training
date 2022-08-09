import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos.component';
import { AlunosService } from './alunos.service';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

@NgModule({
  declarations: [
    AlunosComponent,
    AlunoFormComponent,
    AlunoDetalheComponent
  ],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    FormsModule
   ],
  exports: [],
  providers: [
    AlunosService,
    AlunosDeactivateGuard,
    AlunoDetalheResolver
  ],
})
export class AlunosModule {}
