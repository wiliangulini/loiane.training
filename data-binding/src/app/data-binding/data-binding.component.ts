import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  // styleUrls: ['./data-binding.component.scss']
  styles: [`.highlight {
    background-color: yellow;
    font-weight: bold;
  }`]
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://loaiane.training.com';
  cursoAngular: boolean = true;
  urlImagem: string = 'http://lorempixel.com.br/500/400/?1';

  valorAtual: string = '';
  valorSalvo: any;

  isMouseOver: boolean = false;

  nome: string = 'abc';

  nomeDoCurso: string = 'Angular';

  valorInicial: any = 15;

  getValor() {
    return 1;
  }

  getCurtirCurso() {
    return true;
  }



  botaoClicado() {
    console.clear()
    console.log('clicou')
  }

  onKeyUp(event: KeyboardEvent) {
    // console.log((<HTMLInputElement>event.target).value);
    this.valorAtual = (<HTMLInputElement>event.target).value;
  }

  salvarValor(valor: any) {
    console.log(valor);
    // this.valorSalvo = (<HTMLInputElement>valor.target).value
    this.valorSalvo = valor;
  }

  onMouseOverOut() {
    console.log(this.isMouseOver);
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(event: any) {
    console.log(event.novoValor);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
