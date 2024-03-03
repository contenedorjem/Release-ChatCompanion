// Importaciones de Angular y Ionic necesarias para el funcionamiento del módulo.
import { NgModule } from '@angular/core'; // Core de Angular, necesario para definir un módulo con @NgModule.
import { CommonModule } from '@angular/common'; // Proporciona directivas básicas de Angular y servicios como ngIf y ngFor.
import { FormsModule } from '@angular/forms'; // Permite trabajar con formularios en Angular.
import { IonicModule } from '@ionic/angular'; // Módulo de Ionic que permite usar componentes de Ionic en este módulo.
// Importación del módulo de enrutamiento específico para la página de restablecimiento de contraseña.
import { PasswordResetPageRoutingModule } from './password-reset-routing.module';
// Importación del componente de la página de restablecimiento de contraseña.
import { PasswordResetPage } from './password-reset.page';

// Decorador @NgModule que marca esta clase como un módulo de Angular.
@NgModule({
  imports: [
    CommonModule, // Importa las funcionalidades comunes de Angular (como ngIf, ngFor, etc.).
    FormsModule, // Habilita el uso de formularios dentro del módulo.
    IonicModule, // Habilita el uso de componentes de Ionic.
    PasswordResetPageRoutingModule // Incorpora las rutas definidas en el módulo de enrutamiento.
  ],
  declarations: [PasswordResetPage] // Declara que PasswordResetPage es un componente de este módulo.
})
export class PasswordResetPageModule {}