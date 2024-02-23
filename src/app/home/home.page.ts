import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from '../models/message.model';
import { OpenaiService } from '../services/openai.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TextToSpeechService } from '../services/textToSpeech.service';
import { AlertController, ModalController, DomController, IonContent } from '@ionic/angular';
import { VoiceRecognitionModalComponent } from 'src/app/components/voice-recognition-modal/voice-recognition-modal.component'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //SCROLLING DE LA PAGINA
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  //MODO DE COLORES
  isDarkMode = false; // Estado inicial del tema
  //MENSAJES INICIALES Y SU LÓGICA DE MUESTRA (NUEVA) [IMPLEMENTACIÓN CORRECTA]
  form: FormGroup; // FormGroup para manejar el formulario de entrada de usuario
  messages: Message[] = []; // Arreglo para almacenar los mensajes del chat
  initialMessages: Message[] = [ // Mensajes iniciales enviados por el bot al cargar la página
    {
      sender: 'bot',
      content:
        'Saludos, soy GURB y estoy programado para mantener conversaciones...',
    },
    {
      sender: 'bot',
      content:
        'Puedes hacer cualquier pregunta vía texto o pulsa el botón del micro para hablar y yo te escucharé...',
    },
    { 
      sender: 'bot', 
      content: '¿Como te puedo ayudar hoy?' 
    },
  ];

  /* CONSTRUCTOR DE LA CLASE */
  constructor(
    private openAI: OpenaiService, // Servicio para interactuar con OpenAI
    private authService: AuthService, // Servicio de autenticación
    private router: Router, // Router para la navegación
    private ttsService: TextToSpeechService, // Servicio de texto a voz
    public modalController: ModalController, // Controlador de modal de Ionic para mostrar ventanas modales
    private alertController: AlertController, // Controlador de alertas
    private domCtrl: DomController, // Controlador de animaciones
    ) {
    this.form = new FormGroup({
      promt: new FormControl(''), // Inicializa el control del formulario con un valor vacío
    });
  }
  /* INICIALIZACIÓN */
  ngOnInit() {
    this.typeOutInitialMessages(); // Llama a la función para mostrar mensajes iniciales al iniciar
  }
  /*LANZAMIENTO DE LOS MENSAJES DE ENTRADA*/
  async typeOutInitialMessages() {
        // Muestra cada mensaje inicial letra por letra, como si se estuviera escribiendo
    for (const initialMessage of this.initialMessages) {
      const messageIndex =
        this.messages.push({ sender: initialMessage.sender, content: '' }) - 1; // Agrega un nuevo mensaje vacío y obtiene su índice
      for (let i = 0; i < initialMessage.content.length; i++) {
        this.messages[messageIndex].content += initialMessage.content.charAt(i); // Agrega letra por letra al contenido
        await this.delay(50); // Espera entre cada letra para simular la "escritura"
      }
      await this.ttsService.speak(this.messages[messageIndex].content); // Usa TTS para leer el mensaje
      await this.delay(50); // Pequeña pausa antes del próximo mensaje
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms)); // Función para crear una pausa/delay
  }

  /*IMPORTACIÓN DEL MODAL*/
  async presentVoiceRecognitionModal() {
        // Presenta el modal de reconocimiento de voz y establece el texto reconocido en el formulario
    const modal = await this.modalController.create({
      component: VoiceRecognitionModalComponent,
      cssClass: 'my-custom-class', // Opcional
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.transcript) {
      this.form.controls['promt'].setValue(data.transcript);
    }
  }
  /*BOLEANO QUE ESTABLECE EL INDICADOR DE CARGA */
  loading: boolean = false; // Indicador de carga mientras se espera la respuesta de OpenAI

/* ENVÍO DEL MENSAJE */
submit() {
  const prompt = this.form.value.promt.trim();
  if (!prompt) {
    console.log('No se envía el mensaje porque está vacío.');
    return;
  }

  // Mensaje Usuario
  const userMsg: Message = { sender: 'me', content: prompt };
  this.messages.push(userMsg);
  this.scrollToBottom();

  this.form.reset();
  this.form.disable();
  this.loading = true;

  this.openAI.sendQuestion(prompt).subscribe({
    next: (res: any) => {
      console.log(res);

      // Preparar el mensaje del bot pero no establecer el contenido aún
      const botMsg: Message = { sender: 'bot', content: '' };
      this.messages.push(botMsg); // Agrega el mensaje del bot al array para reservar su posición

      // Llama a typeText para "escribir" la respuesta del bot letra por letra
      this.typeText(res.bot, this.messages.length - 1); // Asegúrate de pasar el índice correcto del mensaje del bot

      this.loading = false;
      this.form.enable();
    },
    error: (error: any) => {
      console.error(error);
      // Manejar el error de manera similar
      // Puedes llamar a typeText con un mensaje de error si lo prefieres
      this.loading = false;
      this.form.enable();
    },
  });
}



  /* FUNCION DE ESCRITURA */
  typeText(text: string, messageIndex: number) {
    let textIndex = 0;
    let interval = setInterval(() => {
      if (textIndex < text.length) {
        this.messages[messageIndex].content += text.charAt(textIndex);
        textIndex++;
      } else {
        clearInterval(interval);
        this.scrollToBottom();
  
        // Llama al servicio TTS una vez que el mensaje ha sido completamente "escrito"
        this.ttsService.speak(this.messages[messageIndex].content).then(() => {
          console.log("Reproducción de TTS completada");
        }).catch((error) => {
          console.error("Error al reproducir TTS", error);
        });
      }
    }, 15);
  }
  
  
  /* FUNCIÓN DE SCROLLING */
  scrollToBottom() {
    this.content.scrollToBottom(2000);
  }
  /* FUNCIONES DE PESTAÑA */
  // LOGOUT
  async logout() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: '¿Quieres cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Logout cancelado');
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.authService.logout().then(() => {
              this.router.navigateByUrl('/login');
            }).catch(error => {
              console.error('Error al cerrar sesión:', error);
            });
          }
        }
      ]
    });
  
    await alert.present();
  }

  

  //IMPLEMENTACIONES PENDIENTES
  cambiarEstado() {
    // Implementa la lógica para cambiar el estado
  }

  verPerfil() {
    // Implementa la navegación a la página de perfil del usuario
  }


  //FIN DE PENDIENTES
}