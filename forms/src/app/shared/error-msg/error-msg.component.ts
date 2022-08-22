import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { VerificaEmailService } from 'src/app/data-form/services/verifica-email.service';
import { FormValidations } from '../form-validations';
import { ConsultaCepService } from '../services/consulta-cep.service';

import { DropdownService } from '../services/dropdown.service';
import { DataFormComponent } from './../../data-form/data-form.component';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent extends DataFormComponent implements OnInit {


  // @Input() mostrarErro: boolean = false;
  // @Input() msgErro: string = '';

  @Input() nome: string = '';

  @Input() control!: FormControl;

  @Input() label: string = '';

  constructor(FB: FormBuilder,
    HTTP: HttpClient,
    DS: DropdownService,
    VES: VerificaEmailService,
    CS: ConsultaCepService) {
    super(FB, HTTP, DS, VES, CS);
  }

  override ngOnInit(): void {
  }

  get errorMessage() {

    for(const propertyName in this.control.errors) {
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])
      }
    }
    return null;
  }
}
