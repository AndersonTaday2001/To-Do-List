# API de Gestión de Tareas (To-Do List) con Usuarios

## Descripción

Este proyecto es una API REST para la gestión básica de tareas personales, diseñada para usuarios registrados. Permite crear cuentas, iniciar sesión y administrar tareas propias, con funcionalidades para crear, listar, actualizar y eliminar tareas. La API está organizada de forma modular y con versionado para facilitar mantenimiento y futuras mejoras.

---

## Lógica de negocio

- Los usuarios pueden registrarse usando su correo electrónico y una contraseña.
- Una vez autenticados mediante JWT, pueden gestionar sus tareas personales.
- Cada tarea tiene un título obligatorio y una descripción opcional.
- Las tareas pueden marcarse como completadas o pendientes.
- Los usuarios sólo pueden ver y modificar sus propias tareas.

---

## Requisitos funcionales

1. **Gestión de usuarios**
   - Registro con email y contraseña.
   - Login que devuelve un token JWT para autenticar solicitudes.

2. **Gestión de tareas**
   - Crear tareas asignadas al usuario autenticado.
   - Listar todas las tareas del usuario.
   - Actualizar el estado de la tarea (completada o pendiente).
   - Eliminar tareas.

---

## Requisitos no funcionales

- API REST versionada (actualmente versión 1).
- Validación básica de datos de entrada.
- Autenticación con JWT para proteger las rutas.
- Manejo sencillo de errores y respuestas claras.
- Organización modular para separar la lógica por dominios (usuarios y tareas).
- Documentación básica para facilitar el uso y desarrollo.

---

## Arquitectura y organización del código

El proyecto está organizado bajo una arquitectura modular y versionada para facilitar la escalabilidad y el mantenimiento. La estructura principal es la siguiente:

