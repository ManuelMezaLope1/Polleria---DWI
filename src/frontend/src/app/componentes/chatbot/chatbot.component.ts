// chatbot.component.ts - VERSIÓN LOCAL MEJORADA
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  mensajes: { texto: string, esUsuario: boolean }[] = [];
  nuevoMensaje: string = '';
  chatAbierto: boolean = false;
  cargando: boolean = false;

  constructor() {
    this.mensajes.push({
      texto: '¡Hola! 🍗 Soy el asistente virtual de El Sazón.\n\n¿En qué te puedo ayudar hoy?',
      esUsuario: false
    });
  }

  enviarMensaje() {
    if (!this.nuevoMensaje.trim()) return;

    const mensaje = this.nuevoMensaje;
    this.mensajes.push({ texto: mensaje, esUsuario: true });
    this.nuevoMensaje = '';
    this.cargando = true;

    // Simulamos un pequeño retraso de escritura humana
    setTimeout(() => {
      this.procesarRespuesta(mensaje);
    }, 600);
  }

  procesarRespuesta(mensaje: string) {
    let respuesta = '';
    const msg = mensaje.toLowerCase().trim();

    // 1. Saludos y Cortesía
    if (msg.match(/(hola|buenas|buenos dias|buenas tardes|buenas noches|oe|saludos)/)) {
      respuesta = '¡Hola! Qué gusto saludarte. 🍗 Estoy listo para tomar tu pedido o responder tus dudas.\n\nEscribe **"carta"** para ver las opciones.';
    }
    else if (msg.match(/(gracias|agradecido|buena onda|excelente)/)) {
      respuesta = '¡De nada! Es un placer ayudarte. ¡Buen provecho si ya estás disfrutando tu pollo! 🍟🍗';
    }
    else if (msg.match(/(chau|adios|hasta luego|nos vemos)/)) {
      respuesta = '¡Hasta luego! Que tengas un gran día. ¡Te esperamos pronto en El Sazón! 🍗✨';
    }

    // 2. Platos Específicos (Chaufa y Mostrito)
    else if (msg.includes('chaufa') && (msg.includes('pollo') || msg.includes('combo'))) {
      respuesta = '🍗 **POLLO CON CHAUFA** - S/ 18.90\nIncluye: 1/4 de pollo a la brasa + una porción generosa de arroz chaufa + cremas + gaseosa personal.';
    }
    else if (msg.includes('mostrito') || msg.includes('mostro')) {
      respuesta = '🔥 **EL MOSTRITO DE EL SAZÓN** - S/ 21.90\n¡El favorito! 1/4 de pollo a la brasa + papas fritas + arroz chaufa + todas las cremas.';
    }

    // 3. Promociones y Combos
    else if (msg.includes('promo') || msg.includes('oferta') || msg.includes('descuento')) {
      respuesta = '🎉 **PROMOS DE LA SEMANA:**\n\n' +
                  '1️⃣ **Combo Familiar (S/ 59.90):** 1 Pollo Entero + Papas Grandes + Ensalada Grande + Gaseosa 2L.\n' +
                  '2️⃣ **Dúo Sazón (S/ 34.90):** 1/2 Pollo + Papas + Ensalada + 2 Vasos de Chicha.\n' +
                  '3️⃣ **Almuerzo Express (S/ 15.90):** 1/4 Pollo + Papas + Aguadito (Válido Lun a Vie 12pm - 4pm).';
    }
    else if (msg.includes('familiar') || msg.includes('entero')) {
      respuesta = '👨‍👩‍👧‍👦 **COMBO FAMILIAR** - S/ 59.90\nPerfecto para 4 personas. Incluye:\n• 1 Pollo entero a la brasa\n• Papas fritas crujientes grandes\n• Ensalada fresca o cocida\n• Gaseosa de 2 Litros (Inca Kola o Coca Cola).';
    }

    // 4. Precios y Carta General
    else if (msg.includes('precio') || msg.includes('carta') || msg.includes('menu') || msg.includes('cuesta')) {
      respuesta = '💰 **NUESTRA CARTA DE PRECIOS:**\n\n' +
                  '• **1/4 Pollo (Papas + Ensalada):** S/ 14.90\n' +
                  '• **1/2 Pollo (Papas + Ensalada):** S/ 24.90\n' +
                  '• **1 Pollo Entero (Solo Papas/Ens):** S/ 42.90\n' +
                  '• **Arroz Chaufa Solo:** S/ 8.90\n' +
                  '• **Porción de Papas Extra:** S/ 6.00';
    }

    // 5. Logística (Delivery, Horarios, Dirección)
    else if (msg.includes('delivery') || msg.includes('reparto') || msg.includes('llevar')) {
      respuesta = '🛵 **SERVICIO DE DELIVERY:**\n\n' +
                  '• Haz tu pedido directamente al WhatsApp: **987 654 321**.\n' +
                  '• Cobertura: Todo el distrito y zonas aledañas.\n' +
                  '• ¡Envío **GRATIS** en compras mayores a S/ 35! (Menores a S/ 35 el costo es S/ 4.00).';
    }
    else if (msg.includes('horario') || msg.includes('abierto') || msg.includes('atienden')) {
      respuesta = '🕒 **HORARIO DE ATENCIÓN:**\n\nLunes a Domingo desde las **11:00 AM** hasta las **11:00 PM** (¡Atendemos feriados!).';
    }
    else if (msg.includes('direccion') || msg.includes('donde') || msg.includes('ubicacion') || msg.includes('lugar')) {
      respuesta = '📍 **UBICACIÓN:**\n\nEstamos en **Av. Principal 123, Lima** (A dos cuadras del parque central).\n\nTambién puedes pedir para recoger en tienda llamando al **987 654 321**.';
    }

    // 6. Métodos de Pago y Extras
    else if (msg.match(/(pago|pagar|tarjeta|yape|plin|efectivo)/)) {
      respuesta = '💳 **MÉTODOS DE PAGO:**\n\nAceptamos todas las formas de pago:\n• Efectivo\n• Yape y Plin\n• Tarjetas de Crédito/Débito (Visa, Mastercard) sin comisión extra.';
    }
    else if (msg.includes('crema') || msg.includes('aji') || msg.includes('mayonesa')) {
      respuesta = '🌶️ **NUESTRAS CREMAS:**\n\nTodos los pedidos incluyen Ají de la casa (el secreto del sabor), Mayonesa, Mostaza y Ketchup. Si deseas cremas extra, pídelas al operador de WhatsApp sin costo adicional.';
    }

    // 7. Respuesta por defecto
    else {
      respuesta = '🍗 **EL SAZÓN - Pollería** 🍗\n\nNo logré entender bien tu consulta. Prueba escribiendo alguna de estas palabras clave:\n\n• **Carta** (Ver precios individuales)\n• **Promos** (Combos y ofertas)\n• **Mostrito** (El plato especial)\n• **Delivery** (Cómo pedir a casa)\n• **Dirección** o **Horario**';
    }

    this.mensajes.push({ texto: respuesta, esUsuario: false });
    this.cargando = false;
  }

  toggleChat() {
    this.chatAbierto = !this.chatAbierto;
  }
}
