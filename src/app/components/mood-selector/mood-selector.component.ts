import { Component, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mood-selector',
  templateUrl: './mood-selector.component.html',
  styleUrls: ['./mood-selector.component.scss'],
})
export class MoodSelectorComponent {
  @Output() moodSelected = new EventEmitter<string>();

  moods = [
    { label: 'ALEGRE', value: 'alegre', class: 'success-text' },
    { label: 'TRISTE', value: 'triste', class: 'primary-text' },
    { label: 'ENFADADO', value: 'enfadado', class: 'danger-text' },
    { label: 'ESTRESADO', value: 'estresado', class: 'warning-text' },
    { label: 'ASUSTADO', value: 'asustado', class: 'medium-text' },
    { label: 'NEUTRO', value: 'normal', class: '' }
  ];
  constructor(private modalCtrl: ModalController) {}

  selectMood(mood: string) {
    this.modalCtrl.dismiss({
      selectedMood: mood 
    });
  }
  
}
