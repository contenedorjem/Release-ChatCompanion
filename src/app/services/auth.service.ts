// Importaciones necesarias de Angular, AngularFire y Capacitor.
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';

// Decorador que marca la clase como un servicio que puede ser inyectado, con ámbito en toda la aplicación.
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Inyección del servicio Auth de AngularFire para manejar la autenticación con Firebase.
  constructor(private auth: Auth) {}

  // Método para registrar un nuevo usuario con correo electrónico y contraseña.
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Método para iniciar sesión con correo electrónico y contraseña.
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Método para iniciar sesión con autenticación biométrica. (Aún no implementado completamente)
  biometricLogin(): Promise<void> {
    const { BiometricAuth } = Plugins;
    return BiometricAuth['biometricAuthenticate']().then((result: any) => {
      if (result.success) {
        // Lógica para manejar un inicio de sesión exitoso con autenticación biométrica.
        return Promise.resolve();
      } else {
        // Si la autenticación falla, se rechaza la promesa.
        return Promise.reject('Authentication failed');
      }
    }).catch((error: any) => {
      // Manejo de errores en la autenticación biométrica.
      return Promise.reject(error);
    });
  }

  // Método para enviar un correo de restablecimiento de contraseña al usuario.
  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }
  
  // Método para cerrar la sesión del usuario actual.
  logout() {
    return signOut(this.auth);
  }

  // Método para obtener el estado de autenticación del usuario actual como un Observable.
  getUserState(): Observable<any> {
    return new Observable((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        if (user) {
          // Si hay un usuario, se notifica al observador.
          observer.next(user);
        } else {
          // Si no hay usuario, se notifica al observador con null.
          observer.next(null);
        }
      });
      // Proporcionar una forma de desuscribirse del observador.
      return unsubscribe;
    });
  }
}