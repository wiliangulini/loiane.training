import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnviarValorService} from "../enviar-valor.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-secondary">
    </app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit, OnDestroy {

  nome = 'Componente com unsubscribe';
  valor: string = '';

  sub: Subscription[] = [];

  constructor(private service: EnviarValorService) { }

  ngOnInit(): void {
    this.sub.push(this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)))
      .subscribe(novoValor => this.valor = novoValor));
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
    console.log(`${this.nome} foi destruido`)
  }

}
