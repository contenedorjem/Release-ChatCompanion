// Importa los decoradores Component e Input de Angular para definir el componente y permitir la entrada de datos al componente, respectivamente.
import { Component, Input } from '@angular/core';
// Importa ModalController de Ionic Angular para controlar el modal.
import { ModalController } from '@ionic/angular';
// Importa el modelo Message desde la ruta especificada para tipar los datos de los mensajes.
import { Message } from 'src/app/models/message.model';

// Decorador que define la configuración del componente, incluyendo el selector para usar en el HTML,
// la ruta al archivo HTML del template, y la ruta al archivo de estilos.
@Component({
  selector: 'app-historial-modal', // Selector CSS del componente para usar en HTML.
  templateUrl: './historial-modal-component.component.html', // Ruta al archivo HTML del componente.
  styleUrls: ['./historial-modal-component.component.scss'], // Ruta al archivo de estilos del componente.
})
export class HistorialModalComponent {
  // Decorador Input para permitir que el historial de mensajes sea pasado al componente como un input.
  // Esto permite que el componente sea reutilizable y configurado externamente.
  @Input() historial: Message[] = [];

  // Constructor del componente, inyecta el ModalController para controlar la presentación del modal.
  constructor(private modalCtrl: ModalController) { }

  // Método para cerrar el modal. Utiliza el ModalController inyectado para descartar el modal.
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
