// Importaciones necesarias de Angular y RxJS
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

// Decorador que marca la clase como un servicio que puede ser inyectado, y además, disponible globalmente
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Inyección de dependencias del servicio de autenticación y el router de Angular
  constructor(private authService: AuthService, private router: Router) {}

  // Método que determina si la ruta puede ser activada
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Obtiene el estado del usuario a través del servicio de autenticación (PIPE O PIPELINE)
    return this.authService.getUserState().pipe(
      take(1), // Toma el primer valor emitido por el observable y lo completa
      map(user => !!user), // Convierte el usuario a un valor booleano (true si existe, false si no)
      tap(loggedIn => { // Realiza un efecto secundario dependiendo del estado de autenticación
        if (!loggedIn) {
          console.log('access denied'); // Si no está autenticado, muestra un mensaje de acceso denegado
          this.router.navigate(['/login']); // Y redirige al usuario a la página de login
        }
      })
    );
  }
}