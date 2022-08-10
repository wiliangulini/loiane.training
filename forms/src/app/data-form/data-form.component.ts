import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
    ) {

    this.formulario = this.fb.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
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

        this.resetar();
      },
      error: error => console.log(error)
    });

  }

  resetar() {
    this.formulario.reset();
  }
}
