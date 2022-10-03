import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base [nome]="nome" [valor]="valor$ | async" estilo="bg-success">
    </app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit, OnDestroy {

  nome = 'Componente com async';
  valor$: Observable<string>;

  constructor(private service: EnviarValorService) {
    this.valor$ = this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)));
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruido`)
  }

}
