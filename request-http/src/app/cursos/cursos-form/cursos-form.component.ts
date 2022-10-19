import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertModalService } from '../../shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private service: Cursos2Service,
    private alertModal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) {

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }

  ngOnInit(): void {

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap((id: any) => this.service.loadByID(id))
    //   )
    //   .subscribe(curso => this.updateForm(curso))

      // concatMap => ordem da requisição importa
      // mergeMap => ordem não importa
      // exhaustMap => casos de login ( vai fazer a requisição e obter a resposta antes de partir pra uma segunda tentativa )

  }

  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome,
  //   })
  // }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  hasErrorRequired(field: string) {
    // @ts-ignore
    return this.form.get(field)?.errors && this.form.get(field)?.errors['required'];
  }

  hasErrorMinlength(field: string) {
    return this.form.get(field)?.errors?.['minlength'];
  }

  hasErrorMaxlength(field: string) {
    return this.form.get(field)?.errors?.['maxlength'];
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');

      let msgSuccess = 'Curso criado com sucesso!!!';
      let msgError = 'Erro ao criar curso, tente novamente!';
      if(this.form.value.id) {
        console.log(this.form.value.id)
        msgSuccess = 'Curso atualizado com sucesso!!!';
        msgError = 'Erro ao atualizar curso, tente novamente';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.alertModal.showAlertSuccessr(msgSuccess);
          this.location.back();
        },
        error => this.alertModal.showAlertDanger(msgError)
      );

      /*if(this.form.value.id) {
        // update
        this.service.update(this.form.value).subscribe(
          success => {
            this.alertModal.showAlertSuccessr('Curso atualizado com sucesso!!!');
            this.location.back();
          },
          error => this.alertModal.showAlertDanger('Erro ao atualizar curso, tente novamente'),
          () => console.log('update completo')
        )
      } else {
        this.service.create(this.form.value).subscribe(
          success => {
            this.alertModal.showAlertSuccessr('Curso criado com sucesso!!!');
            this.location.back();
          },
          error => this.alertModal.showAlertDanger('Erro ao criar curso, tente novamente'),
          () => console.log('request completo')
        )
      }*/
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    //console.log('onCancel');
  }


}
