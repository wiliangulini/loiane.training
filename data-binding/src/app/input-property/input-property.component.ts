import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.scss']
})
export class InputPropertyComponent implements OnInit {

  @Input('nome') nomeDoCurso: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
