import {Component, OnInit} from '@angular/core';
import {CursosService} from "../cursos.service";
import {Curso} from "../curso";
import {catchError, empty, Observable, Subject} from "rxjs";
import {AlertModalService} from "../../shared/alert-modal.service";
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[] = [];
  //bsModalRef?: BsModalRef;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.onRefresh();
  }

  ngOnInit(): void {
    //this.service.list().subscribe(dados => this.cursos = dados)

  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
//        this.error$.next(true);
        this.handleError();
        return empty();
      })
    )
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde;';
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route})
  }

}
