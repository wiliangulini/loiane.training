import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
    ) {

    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.formulario)

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value)).subscribe({
      next: data => {
        console.log(data);
        //reseta o form

        //this.resetar();
      },
      error: error => console.log(error)
    });

  }

  resetar() {
    this.formulario.reset();
  }


  verificaValidTouched(campo: any) {
    //return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
    return !this.formulario.get(campo)?.valid && !!this.formulario.get(campo)?.touched;
    // tentar entender pq o comentario nao deu certo mas o segundo deu.
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if(campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: any) {
    return {'is-invalid': this.verificaValidTouched(campo)}
  }
}
