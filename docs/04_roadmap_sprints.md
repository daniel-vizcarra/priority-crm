# Roadmap del Proyecto: CRM Priority - Seguros Ideal

Este documento define la planificación en 8 Sprints de desarrollo bajo metodología Scrum.

## Sprint 1: Infraestructura y Seguridad (Actual)
* **Tarea 1:** Configuración de repositorios (GitHub) y entornos.
* **Tarea 2:** Setup de base de datos y arquitectura base (React, Node, PostgreSQL).
* **Tarea 3:** Módulo de autenticación (Login y gestión de roles: Asesor, Gerente, Admin).
* **Tarea 4:** Pruebas unitarias de autenticación.

## Sprint 2: Módulo de Clientes
* **Tarea 1:** Desarrollo del CRUD (Crear, Leer, Actualizar, Borrar) de clientes y prospectos.
* **Tarea 2:** Implementación de campos de información específicos de pólizas.
* **Tarea 3:** Funcionalidad de búsqueda y filtros básicos.
* **Tarea 4:** Pruebas unitarias y de integración del módulo de clientes.

## Sprint 3: Tablero Kanban (Pipeline Comercial)
* **Tarea 1:** Desarrollo de la vista de pipeline con etapas de venta.
* **Tarea 2:** Implementación de la funcionalidad Drag & Drop de oportunidades.
* **Tarea 3:** Funcionalidad de registro de actividades por oportunidad.
* **Tarea 4:** Pruebas unitarias y funcionales del módulo de pipeline.

## Sprint 4: Módulo de Cotizaciones
* **Tarea 1:** Interfaz para creación y edición de cotizaciones.
* **Tarea 2:** Lógica de asociación cotización-prospecto-aseguradora.
* **Tarea 3:** Implementación del historial de versiones de cotización.
* **Tarea 4:** Pruebas del módulo de cotizaciones.

---
> **HITO: PRE-DEFENSA (60% DEL PROYECTO)**
---

## Sprint 5: Módulo de Renovaciones
* **Tarea 1:** Funcionalidad para el registro de pólizas emitidas.
* **Tarea 2:** Lógica backend para alertas automáticas de renovación (30, 15 y 7 días).
* **Tarea 3:** Interfaz de calendario de vencimientos.
* **Tarea 4:** Pruebas del módulo de pólizas.

## Sprint 6: Analítica y Reportes (Dashboard)
* **Tarea 1:** Desarrollo de la interfaz del Dashboard con métricas comerciales en tiempo real.
* **Tarea 2:** Implementación de gráficas de conversión y estado del pipeline.
* **Tarea 3:** Funcionalidad de exportación de reportes (PDF/Excel).
* **Tarea 4:** Pruebas del módulo de reportes.

## Sprint 7: Módulo Chatbot WhatsApp & Notificaciones
* **Tarea 1:** Integración con la API oficial de WhatsApp Business (Meta) mediante webhooks.
* **Tarea 2:** Desarrollo de respuestas automáticas para el chatbot y opciones de autoservicio.
* **Tarea 3:** Implementación del flujo para que el cliente consulte el estado de su póliza por WhatsApp.
* **Tarea 4:** Funcionalidad para registrar automáticamente las conversaciones de WhatsApp en el historial del CRM.

## Sprint 8: Release y Producción
* **Tarea 1:** Ejecución de Pruebas de Aceptación de Usuario (UAT).
* **Tarea 2:** Corrección de bugs detectados y ajustes de UI/UX.
* **Tarea 3:** Redacción de documentación técnica y manual de usuario.
* **Tarea 4:** Despliegue final en servidor de producción y capacitación al equipo.