import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent implements OnInit {

  id: any;
  aluno: any;
  inscricao: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService) { }

  ngOnInit(): void {
    // this.inscricao = this.route.params.subscribe(params => {

    //   this.id = params['id'];

    //   this.aluno = this.alunosService.getAluno(this.id)

    // })
    console.log('ngOnInit: AlunoDetalheComponent')

    this.inscricao = this.route.data.subscribe(data => {
      console.log('Recebndo OBJETO aluno do Resolver')
      this.aluno = data['aluno'];
    })
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar'])
  }

}
