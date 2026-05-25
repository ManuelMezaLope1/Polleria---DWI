package com.springboot.backend.chatbot.servicio;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatBotServicio {
    public String enviarMensaje(String mensaje){
        RestTemplate restTemplate =new RestTemplate();

        HttpHeaders headers =new HttpHeaders();

        headers.setContentType(
            MediaType.APPLICATION_JSON
        );

        String body = """
        {
            "mensaje":"%s"
        }
        """.formatted(mensaje);

        HttpEntity<String> entity =new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.exchange(
                        "http://localhost:5000/chat",
                        HttpMethod.POST,
                        entity,
                        String.class
                );

        return response.getBody();
    }
}