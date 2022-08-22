import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(private http: HttpClient,
    private cepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    //console.log(form.form.value);

    this.http.post('https://httpbin.org/post', JSON.stringify(form.form.value)).subscribe((data) => {

      form.form.reset();
    }, (err: any) => console.log(err))
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {'invalid-feedback': this.verificaValidTouched(campo)}
  }


  consultaCEP(v: FocusEvent, form: any) {
    let cep: string = (<HTMLInputElement>v.target).value;

    if(cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)?.subscribe((dados: any) => this.populaDadosForm(dados, form))
    }

  }

  populaDadosForm(dados: any, formulario: NgForm) {

    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        //cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    })
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
    })
  }
}
