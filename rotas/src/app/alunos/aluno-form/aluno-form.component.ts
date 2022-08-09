import { AlunosService } from './../alunos.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit, IFormCanDeactivate {

  id: any;
  aluno: any = {};
  inscricao: Subscription = new Subscription();
  private formMudou: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService) { }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(params => {

      this.id = params['id'];

      this.aluno = this.alunosService.getAluno(this.id);

      if(this.aluno === null) {
        this.aluno = {};
      }
    })
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  onInput() {
    console.log('mudou')
    this.formMudou = true;
  }

  podeMudarRota() {
    if(this.formMudou) {
      confirm('Tem certeza que desaja sair dessa página?')
    }

    return true;
  }

  podeDesativar() {
    return this.podeMudarRota();
  }

}
