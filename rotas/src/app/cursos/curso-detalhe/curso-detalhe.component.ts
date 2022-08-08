import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.scss']
})
export class CursoDetalheComponent implements OnInit {

  id: any;
  inscricao: Subscription = new Subscription();
  curso: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService) {
    // console.log(this.route)
    // this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe((v: any) => {
      this.id = v['id'];

      this.curso = this.cursosService.getCurso(this.id);

      if(this.curso == null) {
        this.router.navigate(['/naoEncontrado'])
      }
    })
  }

  ngOnDestroy() {
    console.log('destroy')
    this.inscricao.unsubscribe();
  }

}
