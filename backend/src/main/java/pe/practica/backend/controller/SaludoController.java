package pe.practica.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SaludoController {

    @GetMapping("/api/saludo")
    public String saludar() {
        return "Hola, Angular. Spring Boot está funcionando y conectado a PostgreSQL.";
    }
}