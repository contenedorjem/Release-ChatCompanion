import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage {
  email = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      message:
        '¿Deseas restablecer la contraseña para este correo electrónico?',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingresa tu correo electrónico',
          value: this.email,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Restablecimiento de contraseña cancelado.');
          },
        },
        {
          text: 'Enviar',
          handler: (data) => {
            this.authService
              .resetPassword(data.email)
              .then(() => {
                console.log(
                  'Solicitud de restablecimiento enviada. Verifica tu correo electrónico.'
                );
              })
              .catch((error) => {
                console.error(error);
              });
          },
        },
      ],
    });

    await alert.present();
  }
}
