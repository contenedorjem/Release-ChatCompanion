// Importaciones necesarias de Angular para realizar peticiones HTTP y marcar la clase como inyectable.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Importación del archivo de entorno para acceder a variables de entorno como la URL base de la API.
import { environment } from 'src/environments/environment';

// Decorador Injectable que marca la clase como un servicio que puede ser inyectado, con ámbito en toda la aplicación.
@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  // Inyección del servicio HttpClient de Angular para hacer solicitudes HTTP.
  constructor(private http: HttpClient) { }
  // Método para enviar una pregunta a la API. Recibe la pregunta como argumento.
  sendQuestion(promt: string) {
    // Realiza una solicitud POST a la URL base definida en las variables de entorno, enviando la pregunta en el cuerpo de la solicitud.
    return this.http.post(environment.baseUrl, { promt });
  }
}