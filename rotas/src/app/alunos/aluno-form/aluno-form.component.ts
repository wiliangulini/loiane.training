import { AlunosService } from './../alunos.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  id: any;
  aluno: any = {};
  inscricao: Subscription = new Subscription();

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
    console.log('ngOnDestroy')
    this.inscricao.unsubscribe();
  }

}
