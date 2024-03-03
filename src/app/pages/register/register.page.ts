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
                  this.router.navigateByUrl('/home');
                }).catch(error => {
                  console.error(error);
                });
              }
            }
          ]
        });
    
        await alert.present();
      } else {
        console.error('Las contraseñas no coinciden');
      }
    }
    
  }