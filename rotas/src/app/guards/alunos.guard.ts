import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable()
export class AlunosGuard implements CanActivateChild {

  constructor() {

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // console.log(route);
    // console.log(state);

    console.log('AlunosGuard: guarda de rota filha');

    if(state.url.includes('editar')) {
    //   alert('Usuário sem aceeso!');

    //   return of(false);
    }

    return true;
  }
}
