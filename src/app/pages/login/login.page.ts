// Importaciones necesarias de Angular, Ionic y servicios personalizados.
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Servicio de Angular para la navegación.
import { AlertController } from '@ionic/angular'; // Componente de Ionic para mostrar alertas.
import { AuthService } from '../../services/auth.service'; // Servicio de autenticación personalizado.

// Decorador @Component que marca la clase como un componente Angular con su selector y archivos asociados.
@Component({
  selector: 'app-login', // Selector CSS para utilizar el componente.
  templateUrl: './login.page.html', // Plantilla HTML para el componente.
  styleUrls: ['./login.page.scss'], // Estilos específicos para el componente.
})
export class LoginPage {
  email: string = ''; // Propiedad para almacenar el correo electrónico ingresado por el usuario.
  password: string = ''; // Propiedad para almacenar la contraseña ingresada por el usuario.

  // Constructor que inyecta los servicios necesarios en el componente.
  constructor(
    private authService: AuthService, // Servicio para manejar la autenticación.
    private router: Router, // Servicio para manejar la navegación.
    private alertController: AlertController, // Servicio para mostrar alertas.
  ) {}

  // Método asincrónico para manejar el inicio de sesión con correo electrónico y contraseña.
  async login() {
    // Intenta iniciar sesión con el servicio de autenticación.
    this.authService.login(this.email, this.password).then(() => {
      // Si el inicio de sesión es exitoso, navega a la página de inicio.
      this.router.navigateByUrl('/home');
    }).catch(async (error) => {
      // Si hay un error, registra el error en la consola y muestra una alerta al usuario.
      console.error(error);
      // Crea y muestra una alerta informando al usuario del error.
      const alert = await this.alertController.create({
        header: 'Error al iniciar sesión',
        message: 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.',
        buttons: ['Aceptar']
      });
      await alert.present();
    });
  }

  // Método para iniciar sesión mediante autenticación biométrica.
  biometricLogin() {
    // Utiliza el servicio de autenticación para el inicio de sesión biométrico.
    this.authService.biometricLogin().then(() => {
      // Si el inicio de sesión es exitoso, navega a la página de inicio.
      this.router.navigateByUrl('/home');
    }).catch(err => {
      // En caso de error, registra el error en la consola.
      console.error(err);
    });
  }
}