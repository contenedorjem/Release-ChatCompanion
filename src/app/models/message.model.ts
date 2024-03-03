// Define la interfaz 'Message' para ser utilizada en la representación de mensajes
// dentro de la aplicación. Esta interfaz ayuda a garantizar que todos los mensajes
// tengan una estructura consistente a lo largo del código.
export interface Message {
// 'sender' indica quién envía el mensaje. Por ejemplo, puede ser 'bot' o 'me' para indicar si el mensaje proviene del bot o del usuario.
    sender: string, 
// 'content' contiene el contenido del mensaje. Aunque primariamente se espera que sea una cadena de texto ('string'),
// se permite 'any' para flexibilidad, por ejemplo, en casos donde el contenido pueda incluir otro tipo de datos como objetos.
    content: string | any, 
}