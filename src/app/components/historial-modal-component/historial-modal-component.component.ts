import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-historial-modal',
  templateUrl: './historial-modal-component.component.html',
  styleUrls: ['./historial-modal-component.component.scss'],
})
export class HistorialModalComponent {
  @Input() historial: Message[] = [];

  constructor(private modalCtrl: ModalController) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}