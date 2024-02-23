import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController,
    ) {}

  async login() {
    this.authService.login(this.email, this.password).then(() => {
      this.router.navigateByUrl('/home');
    }).catch(async (error) => {
      console.error(error);
  
      // Crear y mostrar la alerta de error
      const alert = await this.alertController.create({
        header: 'Error al iniciar sesión',
        message: 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    });
  }

  biometricLogin() {
    this.authService.biometricLogin().then(() => {
      this.router.navigateByUrl('/home');
    }).catch(err => {
      console.error(err);
      // Manejar errores, como mostrar un mensaje al usuario
    });
  }
}


