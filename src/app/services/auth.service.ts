// AuthService

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  // Registrar un nuevo usuario
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Iniciar sesión
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Iniciar sesión con huella dactilar
  biometricLogin(): Promise<void> {
    const { BiometricAuth } = Plugins;
    return BiometricAuth['biometricAuthenticate']().then((result: any) => {
      if (result.success) {
        return Promise.resolve();
      } else {
        return Promise.reject('Authentication failed');
      }
    }).catch((error: any) => {
      return Promise.reject(error);
    });
  }

  // Enviar correo de recuperación
  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }
  
  // Cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  // Obtener el estado de autenticación del usuario
  getUserState(): Observable<any> {
    return new Observable((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        if (user) {
          observer.next(user);
        } else {
          observer.next(null);
        }
      });

      // Proporcionar una forma de desuscribirse
      return unsubscribe;
    });
  }
}
