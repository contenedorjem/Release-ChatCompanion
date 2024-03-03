// Importaciones necesarias de Angular y Ionic, así como servicios personalizados.
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Servicio de Angular para la navegación.
import { AlertController } from '@ionic/angular'; // Componente de Ionic para mostrar alertas.
import { AuthService } from '../../services/auth.service'; // Servicio de autenticación personalizado.

// Decorador @Component que marca la clase como un componente Angular con su selector y archivos asociados.
@Component({
  selector: 'app-register', // Selector CSS para utilizar el componente.
  templateUrl: './register.page.html', // Plantilla HTML para el componente.
  styleUrls: ['./register.page.scss'], // Estilos específicos para el componente.
})
export class RegisterPage {
  // Propiedades para almacenar los valores ingresados por el usuario.
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Constructor que inyecta los servicios necesarios en el componente.
  constructor(
    private authService: AuthService, // Servicio para manejar la autenticación.
    private router: Router, // Servicio para manejar la navegación.
    private alertController: AlertController, // Servicio para mostrar alertas.
  ) {}

  // Método asincrónico para manejar el registro de usuarios.
  async register() {
    // Verifica si las contraseñas ingresadas coinciden.
    if (this.password === this.confirmPassword) {
      // Si coinciden, crea y presenta una alerta para confirmar el registro.
      const alert = await this.alertController.create({
        header: 'Confirmar Registro',
        message: `¿Deseas registrarte con el correo electrónico ${this.email}?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Registro cancelado.');
            }
          },
          {
            text: 'Registrar',
            handler: () => {
              // Intenta registrar al usuario con el servicio de autenticación.
              this.authService.register(this.email, this.password).then(() => {
                // Si el registro es exitoso, navega a la página de inicio.
                this.router.navigateByUrl('/home');
              }).catch(error => {
                // En caso de error, registra el error en la consola.
                console.error(error);
              });
            }
          }
        ]
      });
      await alert.present(); // Muestra la alerta al usuario.
    } else {
      // Si las contraseñas no coinciden, registra un error en la consola.
      console.error('Las contraseñas no coinciden');
    }
  }
}