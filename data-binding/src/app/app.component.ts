import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  valor: number = 5;

  mudarValor() {
    this.valor++;
  }

  deletarCiclo: boolean = false;

  destruirCiclo() {
    this.deletarCiclo = true;
  }
}
