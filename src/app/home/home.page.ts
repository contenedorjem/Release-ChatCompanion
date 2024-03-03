// Importaciones de Angular, Ionic, y servicios y componentes personalizados.
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; // Herramientas de Angular para formularios reactivos.
import { Router } from '@angular/router'; // Servicio de Angular para la navegación entre rutas.
import { AlertController, ModalController, IonContent } from '@ionic/angular'; // Componentes de Ionic para UI interactiva.
import { Message } from '../models/message.model'; // Modelo para los mensajes en la conversación.
import { OpenaiService } from '../services/openai.service'; // Servicio para interactuar con la API de OpenAI.
import { AuthService } from '../services/auth.service'; // Servicio para la autenticación de usuarios.
import { TextToSpeechService } from '../services/textToSpeech.service'; // Servicio para convertir texto en habla.
// Componentes para modales de reconocimiento de voz, selector de estado de ánimo y visualización de historial.
import { VoiceRecognitionModalComponent } from 'src/app/components/voice-recognition-modal/voice-recognition-modal.component';
import { MoodSelectorComponent } from '../components/mood-selector/mood-selector.component';
import { HistorialModalComponent } from '../components/historial-modal-component/historial-modal-component.component';

@Component({
  selector: 'app-home', // Selector CSS para el componente.
  templateUrl: 'home.page.html', // Plantilla HTML del componente.
  styleUrls: ['home.page.scss'], // Estilos específicos del componente.
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent; // Acceso al contenido de Ion para control de desplazamiento.
  isDarkMode = false; // Estado para el modo oscuro (no implementado en este fragmento).
  form: FormGroup; // Formulario reactivo para el input del usuario.
  messages: Message[] = []; // Arreglo para almacenar los mensajes de la conversación.
  initialMessages: Message[] = [ // Mensajes iniciales predeterminados para mostrar al usuario.
    {
      sender: 'bot',
      content: 'Saludos, soy GURB y estoy programado para mantener conversaciones...',
    },
    {
      sender: 'bot',
      content: 'Puedes hacer cualquier pregunta vía texto o pulsa el botón del micro para hablar y yo te escucharé...',
    },
    { 
      sender: 'bot', 
      content: '¿Cómo te puedo ayudar hoy?' 
    },
  ];
  loading: boolean = false; // Indicador de carga para operaciones asíncronas.

  // Constructor para inyectar servicios y controladores.
  constructor(
    private openAI: OpenaiService, // Servicio para interactuar con OpenAI.
    private authService: AuthService, // Servicio para manejar la autenticación.
    private router: Router, // Servicio para la navegación entre rutas.
    private ttsService: TextToSpeechService, // Servicio para la síntesis de texto a voz.
    public modalController: ModalController, // Controlador para manejar modales.
    private alertController: AlertController, // Controlador para mostrar alertas.
  ) {
    this.form = new FormGroup({
      promt: new FormControl(''), // Campo de texto para el mensaje del usuario.
    });
  }
  ngOnInit() {
    this.typeOutInitialMessages(); // Simula la escritura de los mensajes iniciales al iniciar.
  }

  // Simula la escritura de mensajes iniciales y utiliza el servicio de texto a voz.
  async typeOutInitialMessages() {
    for (const initialMessage of this.initialMessages) {
      const messageIndex = this.messages.push({ sender: initialMessage.sender, content: '' }) - 1;
      for (let i = 0; i < initialMessage.content.length; i++) {
        this.messages[messageIndex].content += initialMessage.content.charAt(i);
        await this.delay(50); // Pequeña pausa para simular la escritura.
      }
      await this.ttsService.speak(this.messages[messageIndex].content); // Lee el mensaje con texto a voz.
      await this.delay(50); // Otra pausa tras la lectura.
    }
  }

  // Crea un retraso (delay) en la ejecución para simular la escritura de texto.
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Abre el modal de reconocimiento de voz y establece el texto reconocido en el formulario.
  async presentVoiceRecognitionModal() {
    const modal = await this.modalController.create({
      component: VoiceRecognitionModalComponent,
      cssClass: 'my-custom-class', // Clase CSS para estilos personalizados del modal.
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.transcript) {
      this.form.controls['promt'].setValue(data.transcript);
    }
  }

  // Envía el mensaje del usuario a OpenAI, muestra la respuesta y maneja la carga.
  submit(message: string = '') {
    const prompt = message || this.form.value.promt.trim();
    if (!prompt) {
      console.log('No se envía el mensaje porque está vacío.');
      return;
    } 
    this.addMessage('me', prompt);
    this.form.reset();
    this.loading = true; 
    this.openAI.sendQuestion(prompt).subscribe({
      next: (res: any) => {
        this.addMessage('bot', res.bot);
        this.loading = false;
        this.form.enable();
        this.ttsService.speak(res.bot).then(() => {
          console.log("Reproducción de TTS completada");
        }).catch((error) => {
          console.error("Error al reproducir TTS", error);
        });
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
        this.form.enable();
      },
    });
    this.saveConversation();
  }
  
  // Añade un mensaje al arreglo de mensajes y asegura que la vista se desplace hacia abajo.
  addMessage(sender: string, content: string) {
    this.messages.push({ sender, content });
    this.scrollToBottom();
    this.saveConversation();
  }

  // Desplaza automáticamente la vista hacia el final de la lista de mensajes.
  scrollToBottom() {
    this.content.scrollToBottom(2000);
  }

  // Muestra una alerta para confirmar el cierre de sesión y ejecuta la acción si se confirma.
  async logout() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: '¿Quieres cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        }, {
          text: 'Sí',
          handler: () => {
            this.authService.logout().then(() => {
              this.router.navigateByUrl('/login');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Cambia el estado de ánimo del usuario y lo comunica.
  cambiarEstado(mood: string) {
    const moodMessage = `Hoy me encuentro ${mood}`;
    this.addMessage('me', moodMessage);
  }

  // Muestra un modal para que el usuario seleccione su estado de ánimo.
  async mostrarSelectorEstado() {
    const modal = await this.modalController.create({
      component: MoodSelectorComponent,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.selectedMood) {
      this.submit(`Hoy me encuentro ${data.selectedMood}`);
    }
  }

  // Guarda la conversación actual en el almacenamiento local del navegador.
  saveConversation() {
    localStorage.setItem('conversation', JSON.stringify(this.messages));
  }

  // Muestra el historial de conversaciones guardadas al usuario.
  async verHistoria() {
    const modal = await this.modalController.create({
      component: HistorialModalComponent,
      componentProps: { historial: JSON.parse(localStorage.getItem('conversation') || '[]') }
    });
    await modal.present();
  }
}