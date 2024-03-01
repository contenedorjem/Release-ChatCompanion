import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, IonContent } from '@ionic/angular';
import { Message } from '../models/message.model';
import { OpenaiService } from '../services/openai.service';
import { AuthService } from '../services/auth.service';
import { TextToSpeechService } from '../services/textToSpeech.service';
import { VoiceRecognitionModalComponent } from 'src/app/components/voice-recognition-modal/voice-recognition-modal.component';
import { MoodSelectorComponent } from '../components/mood-selector/mood-selector.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  isDarkMode = false;
  form: FormGroup;
  messages: Message[] = [];
  initialMessages: Message[] = [
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
  loading: boolean = false;

  constructor(
    private openAI: OpenaiService,
    private authService: AuthService,
    private router: Router,
    private ttsService: TextToSpeechService,
    public modalController: ModalController,
    private alertController: AlertController,
  ) {
    this.form = new FormGroup({
      promt: new FormControl(''),
    });
  }

  ngOnInit() {
    this.typeOutInitialMessages();
  }

  async typeOutInitialMessages() {
    for (const initialMessage of this.initialMessages) {
      const messageIndex = this.messages.push({ sender: initialMessage.sender, content: '' }) - 1;
      for (let i = 0; i < initialMessage.content.length; i++) {
        this.messages[messageIndex].content += initialMessage.content.charAt(i);
        await this.delay(50);
      }
      await this.ttsService.speak(this.messages[messageIndex].content);
      await this.delay(50);
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async presentVoiceRecognitionModal() {
    const modal = await this.modalController.create({
      component: VoiceRecognitionModalComponent,
      cssClass: 'my-custom-class',
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.transcript) {
      this.form.controls['promt'].setValue(data.transcript);
    }
  }

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
        this.form.enable(); // Asegúrate de volver a habilitar el formulario aquí
  
        // Mover la llamada al servicio de TTS aquí, después de añadir la respuesta del bot
        this.ttsService.speak(res.bot).then(() => {
          console.log("Reproducción de TTS completada");
        }).catch((error) => {
          console.error("Error al reproducir TTS", error);
        });
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
        this.form.enable(); // Y también aquí
      },
    });
  }
  

  addMessage(sender: string, content: string) {
    this.messages.push({ sender, content });
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.content.scrollToBottom(2000);
  }

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

  cambiarEstado(mood: string) {
    const moodMessage = `Hoy me encuentro ${mood}`;
    this.addMessage('me', moodMessage);
  }


  async mostrarSelectorEstado() {
    const modal = await this.modalController.create({
      component: MoodSelectorComponent,
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
    if (data && data.selectedMood) {
      this.submit(`Hoy me encuentro ${data.selectedMood}`); // Llama a submit directamente
    }
  }
  verHistoria() {
    // Implementa la navegación a la página de perfil del usuario
  }
}
