import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { EstadoBr } from '../shared/models/estado-br.model';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  //estados: EstadoBr[] = new Array;
  estados: Observable<EstadoBr[]> = new Observable<EstadoBr[]>();
  cargos: any[] = [];
  tecnologias: any[] = [];
  newsletterOp: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService
    ) {

    this.formulario = this.fb.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.fb.group({
        cep: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, [Validators.pattern('true')]],
    });
  }

  ngOnInit() {
    // this.dropdownService.getEstadosBr().subscribe({
    //   next: (data: any) => {
    //     console.log(data);

    //     this.estados = data;
    //   },
    //   error: error => console.log(error)
    // })

    this.estados = this.dropdownService.getEstadosBr();

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsletterOp = this.dropdownService.getNewsletter();
  }

  onSubmit() {

    if(this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value)).subscribe({
        next: data => {
          console.log(data);
          //reseta o form

          this.resetar();
        },
        error: error => console.log(error)
      });
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(campo => {
      //console.log(campo)
      const controle = formGroup.get(campo);
      //console.log(controle)
      controle?.markAsDirty();

      if(controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }


  verificaValidTouched(campo: string) {
    //return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
    return !this.formulario.get(campo)?.valid && !!(this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);
    // tentar entender pq o comentario nao deu certo mas o segundo deu.
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if(campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {'is-invalid': this.verificaValidTouched(campo)}
  }

  consultaCEP(event: any) {
    let cep = this.formulario.get('endereco.cep')!.value;
    //let cep: string = (<HTMLInputElement>event.target).value;
    console.log(cep);

    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');


    //Verifica se campo cep possui valor informado.
    if(cep != '') {
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetaDadosForm();

        this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe((dados: any) => {
          console.log(dados);
          this.populaDadosForm(dados);
        })
      }
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        //cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    })

    this.formulario.get('nome')?.setValue('Wilian Gulini');
  }


  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
    })
  }

  setarCargo() {
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};

    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php']);
  }


}
