import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    console.log('AuthGuard')

    return this.veriricarAcesso();
  }

  private veriricarAcesso() {

    if(this.authService.usuarioEstaAutenticado()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;

  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    console.log('Verificando se o usuario pode carregar o cod do modulo');

    return this.veriricarAcesso();
  }

}
