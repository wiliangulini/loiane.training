import { AlunosService } from './../alunos.service';
import { Aluno } from './../aluno';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable(
  { providedIn: 'root' }
)
export class AlunoDetalheResolver implements Resolve<Aluno> {

  constructor(private alunoService: AlunosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

    console.log('AlunoDetalheResolver')

    let id = route.params['id'];

    return this.alunoService.getAluno(id);
  }
}
