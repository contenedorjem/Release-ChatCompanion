// Importaciones necesarias de Angular para definir un módulo y manejar el enrutamiento
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Importación del componente LoginPage que se utilizará en la ruta definida
import { LoginPage } from './login.page';

// Definición de las rutas del módulo. En este caso, solo se define una ruta.
const routes: Routes = [
  {
    path: '', // Define el path como una cadena vacía, lo que indica que esta es la ruta predeterminada del módulo
    component: LoginPage // Asocia el componente LoginPage a la ruta. Cuando se navegue a esta ruta, se cargará LoginPage.
  }
];

// Decorador @NgModule que marca esta clase como un módulo Angular
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa RouterModule y registra las rutas definidas como rutas hijas del módulo
  exports: [RouterModule], // Exporta RouterModule para hacerlo disponible en otros lugares de la aplicación
})
export class LoginPageRoutingModule {}