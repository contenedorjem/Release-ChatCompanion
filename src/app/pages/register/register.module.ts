// Importaciones necesarias de Angular y Ionic para el funcionamiento del módulo.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Proporciona funcionalidades básicas de Angular, como ngIf y ngFor.
import { FormsModule } from '@angular/forms'; // Permite el uso de formularios en Angular.
import { IonicModule } from '@ionic/angular'; // Importa el módulo de Ionic para utilizar sus componentes.
// Importaciones relacionadas con el enrutamiento de la página de registro.
import { RegisterPageRoutingModule } from './register-routing.module'; // Módulo de enrutamiento específico para la página de registro.
// Importación del componente de la página de registro.
import { RegisterPage } from './register.page'; // El componente que representa la página de registro en sí.

// Decorador @NgModule que define este archivo como un módulo Angular.
@NgModule({
  imports: [
    CommonModule, // Importa las funcionalidades comunes de Angular necesarias.
    FormsModule, // Permite trabajar con formularios dentro de la página de registro.
    IonicModule, // Habilita el uso de componentes de Ionic en este módulo.
    RegisterPageRoutingModule // Incorpora el módulo de enrutamiento para la página de registro.
  ],
  declarations: [RegisterPage] // Declara el componente RegisterPage para que pueda ser utilizado.
})
export class RegisterPageModule {} // Nombre de la clase del módulo, que será utilizado para importarlo en otros lugares de la aplicación.