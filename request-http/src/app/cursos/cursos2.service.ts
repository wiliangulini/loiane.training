import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { CrudService } from './../shared/crud-service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }

  override loadByID(id: any): any {
    return null;
  }
}
