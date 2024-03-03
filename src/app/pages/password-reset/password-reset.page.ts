// Importaciones necesarias de Angular y Ionic.
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Controlador de alertas de Ionic para mostrar mensajes al usuario.
import { AuthService } from '../../services/auth.service'; // Servicio personalizado para la autenticación.

// Decorador @Component para definir metadatos del componente.
@Component({
  selector: 'app-password-reset', // Selector CSS para usar este componente en el HTML.
  templateUrl: './password-reset.page.html', // Plantilla HTML asociada al componente.
  styleUrls: ['./password-reset.page.scss'], // Estilos específicos del componente.
})
export class PasswordResetPage {
  email = ''; // Propiedad para almacenar el correo electrónico ingresado por el usuario.

  // Constructor que inyecta el servicio de autenticación y el controlador de alertas.
  constructor(
    private authService: AuthService, // Servicio para manejar la autenticación.
    private alertController: AlertController // Servicio para mostrar alertas al usuario.
  ) {}

  // Método asincrónico para mostrar una alerta que permite al usuario ingresar su correo electrónico y solicitar el restablecimiento de contraseña.
  async resetPassword() {
    // Crea una alerta con un campo de entrada para el correo electrónico y botones de acción.
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña', // Título de la alerta.
      message: '¿Deseas restablecer la contraseña para este correo electrónico?', // Mensaje de la alerta.
      inputs: [
        {
          name: 'email', // Nombre del campo de entrada.
          type: 'email', // Tipo de entrada para validar el correo electrónico.
          placeholder: 'Ingresa tu correo electrónico', // Texto de ayuda.
          value: this.email, // Valor predeterminado tomado de la propiedad del componente.
        },
      ],
      buttons: [
        {
          text: 'Cancelar', // Botón para cancelar la operación.
          role: 'cancel', // Define el rol del botón para cancelar la operación.
          handler: () => {
            console.log('Restablecimiento de contraseña cancelado.');
          },
        },
        {
          text: 'Enviar', // Botón para enviar la solicitud de restablecimiento.
          handler: (data) => {
            // Llama al método resetPassword del servicio de autenticación pasando el correo electrónico ingresado.
            this.authService.resetPassword(data.email)
              .then(() => {
                console.log('Solicitud de restablecimiento enviada. Verifica tu correo electrónico.');
              })
              .catch((error) => {
                console.error(error); // Captura y registra errores si la solicitud falla.
              });
          },
        },
      ],
    });
    await alert.present(); // Muestra la alerta al usuario.
  }
}