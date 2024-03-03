// Importación de los módulos necesarios de Angular y Ionic
import { Component, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Decorador @Component que define el selector, la plantilla HTML y los estilos CSS para este componente
@Component({
  selector: 'app-mood-selector', // El selector CSS para usar este componente
  templateUrl: './mood-selector.component.html', // La plantilla HTML del componente
  styleUrls: ['./mood-selector.component.scss'], // Los estilos CSS del componente
})
export class MoodSelectorComponent {
  // @Output permite que el componente emita eventos a su componente padre
  // moodSelected es un EventEmitter que emite un string cuando se selecciona un estado de ánimo
  @Output() moodSelected = new EventEmitter<string>();

  // Array que contiene objetos con etiquetas, valores y clases CSS para los diferentes estados de ánimo
  moods = [
    { label: 'ALEGRE', value: 'alegre', class: 'success-text' },
    { label: 'TRISTE', value: 'triste', class: 'primary-text' },
    { label: 'ENFADADO', value: 'enfadado', class: 'danger-text' },
    { label: 'ESTRESADO', value: 'estresado', class: 'warning-text' },
    { label: 'ASUSTADO', value: 'asustado', class: 'medium-text' },
    { label: 'NEUTRO', value: 'normal', class: '' }
  ];

  // Inyecta el ModalController de Ionic para poder controlar los modales
  constructor(private modalCtrl: ModalController) {}

  // Método selectMood se llama cuando el usuario selecciona un estado de ánimo
  // Cierra el modal y pasa el estado de ánimo seleccionado como dato al cerrar
  selectMood(mood: string) {
    this.modalCtrl.dismiss({
      selectedMood: mood 
    });
  }
}