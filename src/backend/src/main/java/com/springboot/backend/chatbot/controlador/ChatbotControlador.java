package com.springboot.backend.chatbot.controlador;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.chatbot.dto.ChatRequest;
import com.springboot.backend.chatbot.servicio.ChatBotServicio;

@RestController
@RequestMapping("/api/v1/public/chat")
public class ChatbotControlador {
    @Autowired
    private ChatBotServicio chatbotServicio;

    @GetMapping("/inicio")
    public Map<String, String> inicio() {
        Map<String, String> respuesta = new HashMap<>();

        respuesta.put(
                "respuesta",
                """
                        Hola 😊 Bienvenido a la pollería El Sazón. ¿En qué puedo ayudarte?\n\n

                        🍗 Carta
                        🔥 Promociones
                        🌶️ Platos picantes
                        🥗 Platos con alergias
                        """);

        return respuesta;
    }

    @PostMapping
    public String chat(
            @RequestBody ChatRequest request) {

        return chatbotServicio
                .enviarMensaje(
                        request.getMensaje());
    }
}