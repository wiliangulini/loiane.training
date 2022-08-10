import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
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

  onSubmit(form: Form): void {
    console.log(form)
    //console.log(this.usuario)
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    console.log(campo)
    return {'invalid-feedback': this.verificaValidTouched(campo)}
  }


  consultaCEP(v: FocusEvent) {
    let cep: string = (<HTMLInputElement>v.target).value;

    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');


    //Verifica se campo cep possui valor informado.
    if(cep != '') {
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;
      console.log(validacep.test(cep))
      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        // this.http.get(`//viacep.com.br/ws/${cep}/json`).pipe(map((dados: any) => {

        //   dados.json()

        // }))
        // .subscribe(result => {

        //   console.log(result);
        // });

        this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe((dados: any) => {
          console.log(dados)
        })
      }
    }
  }
}
