import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

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

    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');


    //Verifica se campo cep possui valor informado.
    if(cep != '') {
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetaDadosForm(form);

        this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe((dados: any) => {
          console.log(dados);
          this.populaDadosForm(dados, form);
        })
      }
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
