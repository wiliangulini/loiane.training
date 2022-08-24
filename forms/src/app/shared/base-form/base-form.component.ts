import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

 abstract submit(): any;

  onSubmit(): void {
    if(this.formulario.valid) {
      this.submit();
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      //console.log(campo)
      const controle = formGroup.get(campo);
      //console.log(controle)
      controle?.markAsDirty();
      controle?.markAsTouched();
      if(controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    //return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
    return (
      !this.formulario.get(campo)?.valid &&
      !!(this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
    // tentar entender pq o comentario nao deu certo mas o segundo deu.
  }

  verificaRequired(campo: string): any {

    return (
      this.formulario.get(campo)?.hasError('required') &&
      !!(this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
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

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }

}
