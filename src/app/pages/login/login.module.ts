// Importaciones de módulos de Angular y Ionic necesarios para este módulo
import { NgModule } from '@angular/core'; // Core de Angular, necesario para definir un módulo con @NgModule
import { CommonModule } from '@angular/common'; // Proporciona directivas y servicios comunes, como ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms'; // Permite trabajar con formularios en Angular, facilitando la captura y validación de datos de entrada.
import { IonicModule } from '@ionic/angular'; // Módulo de Ionic que proporciona los componentes de UI de Ionic y la integración con Angular.
import { LoginPageRoutingModule } from './login-routing.module'; // Importa el módulo de enrutamiento específico para la página de login, definiendo las rutas.
import { LoginPage } from './login.page'; // El componente de la página de login que este módulo declara y usa.

// Decorador @NgModule que define la clase como un módulo de Angular
@NgModule({
  imports: [
    CommonModule, // Importa funcionalidades comunes de Angular necesarias para los templates.
    FormsModule, // Habilita el uso de formularios, crucial para la página de login por la entrada de datos.
    IonicModule, // Integra los componentes de Ionic en la aplicación Angular, permitiendo usarlos en la página de login.
    LoginPageRoutingModule // Añade las rutas definidas para la página de login, asegurando que el componente se muestre correctamente cuando se acceda a su ruta.
  ],
  declarations: [LoginPage] // Declara el componente LoginPage dentro de este módulo, lo que significa que este módulo conoce y puede renderizar LoginPage.
})
export class LoginPageModule {}