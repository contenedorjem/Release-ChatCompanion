// Importaciones necesarias de Angular para definir un módulo y gestionar el enrutamiento.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Importación del componente de la página de registro.
import { RegisterPage } from './register.page';

// Definición de las rutas para este módulo. En este caso, se define una única ruta.
const routes: Routes = [
  {
    path: '', // La ruta para acceder a esta página. Una cadena vacía indica que es la ruta predeterminada del módulo.
    component: RegisterPage // El componente que se debe cargar cuando se navegue a esta ruta.
  }
];

// Decorador @NgModule que marca esta clase como un módulo Angular.
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa RouterModule y registra las rutas definidas como rutas hijas.
  exports: [RouterModule], // Exporta RouterModule para hacerlo disponible en otros lugares de la aplicación.
})
export class RegisterPageRoutingModule {}