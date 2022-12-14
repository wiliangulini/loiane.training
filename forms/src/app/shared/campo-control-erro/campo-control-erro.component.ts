import { HttpClient } from '@angular/common/http';
import { TemplateFormComponent } from '../../template-form/template-form.component';
import { Component, Input, OnInit } from '@angular/core';
import { ConsultaCepService } from '../services/consulta-cep.service';

@Component({
  selector: 'app-campo-control-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrls: ['./campo-control-erro.component.scss']
})
export class CampoControlErroComponent extends TemplateFormComponent implements OnInit {

  @Input() mostrarErro: boolean = false;
  @Input() msgErro: string = '';

  @Input() nome: string = '';

  constructor(HTTP: HttpClient,
    CS: ConsultaCepService) {
    super(HTTP, CS);
  }

  override ngOnInit(): void {
  }

}
