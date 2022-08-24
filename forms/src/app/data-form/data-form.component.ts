import { BaseFormComponent } from './../shared/base-form/base-form.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, tap, distinctUntilChanged, switchMap, EMPTY, empty } from 'rxjs';

import { FormValidations } from '../shared/form-validations';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';
import { Cidade } from '../shared/models/cidade';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //formulario: FormGroup;
  estados: EstadoBr[] = []
  cidades: Cidade[] = []
  //estados: Observable<EstadoBr[]> = new Observable<EstadoBr[]>();
  cargos: any[] = [];
  tecnologias: any[] = [];
  newsletterOp: any[] = [];

  frameworks = ['Vue', 'React', 'Sencha', 'Angular'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private verificaEmailService: VerificaEmailService,
    private cepService: ConsultaCepService
    ) {

    super();
    this.formulario = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.fb.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
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
      frameworks: this.buildFramework(),
    });
  }

  override ngOnInit() {

    //this.estados = this.dropdownService.getEstadosBr();

    this.dropdownService.getEstadosBr().subscribe(dados => this.estados = dados)

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsletterOp = this.dropdownService.getNewsletter();

    this.formulario.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      tap(v => console.log('status CEP: ', v)),
      switchMap(st => st === 'VALID' ?
        this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
        : empty()
      )
    )
    .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('endereco.estado')?.valueChanges.pipe(
      tap(estado => console.log('Novo estado: ', estado)),
      map(estado => this.estados.filter(e => e.sigla === estado)),
      map((estados: any) => estados && estados.length > 0 ? estados[0].id : empty()),
      switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
      tap(console.log)
    )
    .subscribe(cidades => this.cidades = cidades);

    //this.dropdownService.getCidades(8).subscribe(console.log)

  }

  buildFramework() {
    const values = this.frameworks.map(e => new FormControl(false));
    return this.fb.array(values, FormValidations.requiredMinCheckbox(1));
  }

  get formData() {
    return <FormArray>this.formulario.get('frameworks');
  }

  submit() {
    console.log(this.formulario)

    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v)
    })

    console.log(valueSubmit)

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit)).subscribe({
      next: data => {
        console.log(data);
        //reseta o form

        this.resetar();
      },
      error: error => console.log(error)
    });

  }

  cepInvalidoFn(): any {
    return this.formulario.get('endereco.cep')?.hasError('cepInvalido');
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep')!.value;

    if(cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)?.subscribe((dados: any) => this.populaDadosForm(dados))
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

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value).pipe(
      map(emailExiste => emailExiste ? { emailInvalido: true } : null)
    )
  }

  emailJaCadastrado(): any {
    return this.formulario.get('email')?.hasError('emailInvalido');
  }

}
