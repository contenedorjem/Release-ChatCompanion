import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController,
    ) {}

    async register() {
      if (this.password === this.confirmPassword) {
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
                this.authService.register(this.email, this.password).then(() => {
                  // Navegar a la página principal o mostrar éxito
                  this.router.navigateByUrl('/home');
                }).catch(error => {
                  // Manejar errores de registro
                  console.error(error);
                  // Aquí podrías mostrar un mensaje de error al usuario, por ejemplo, usando un Alert de Ionic.
                });
              }
            }
          ]
        });
    
        await alert.present();
      } else {
        // Mostrar un mensaje de error indicando que las contraseñas no coinciden
        console.error('Las contraseñas no coinciden');
        // Aquí podrías mostrar un mensaje de error al usuario, por ejemplo, usando un Toast de Ionic.
      }
    }
    
  }