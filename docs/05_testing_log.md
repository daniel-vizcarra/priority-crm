# Bitácora de Pruebas de Software (QA Log)

Este documento mantiene un registro cronológico e histórico de las pruebas automatizadas (Unitarias, de Integración y E2E) ejecutadas para asegurar la calidad y estabilidad del CRM a lo largo de los diferentes Sprints.

---

## 🏃 Sprint 1: Infraestructura y Seguridad

**Resumen:** En este sprint se priorizó blindar los puntos de entrada de la aplicación, asegurar el enrutamiento visual en React y certificar las protecciones de base de datos y JWT.

### Backend (API & Seguridad)
Framework: `Jest` + `Supertest`

| ID | Descripción de la Prueba | Tipo | Resultado | Fecha Ejecución |
|---|---|---|:---:|---|
| `AUTH-B01` | `POST /api/auth/register` - Debería denegar acceso sin token (401) | Seguridad | ✅ PASS | 10/May/2026 |
| `AUTH-B02` | `POST /api/auth/register` - Debería registrar un nuevo usuario si se provee un token válido de `ADMIN` | Integración | ✅ PASS | 10/May/2026 |
| `AUTH-B03` | `POST /api/auth/register` - Debería rechazar intentar registrar a alguien con un correo ya existente (400) | Validación | ✅ PASS | 10/May/2026 |
| `AUTH-B04` | `POST /api/auth/login` - Debería iniciar sesión correctamente y retornar un token JWT firmado | Unitaria | ✅ PASS | 10/May/2026 |
| `AUTH-B05` | `POST /api/auth/register` - Debería denegar el registro si se usa un token de un rol inferior como `ASESOR` (403 Forbidden) | Seguridad | ✅ PASS | 10/May/2026 |
| `AUTH-B06` | `POST /api/auth/login` - Debería rechazar un intento de login con credenciales falsas/incorrectas | Validación | ✅ PASS | 10/May/2026 |
| `AUTH-B07` | `GET /api/usuarios/me` - Debería permitir el acceso y retornar perfil propio únicamente si se envía un JWT válido | Integración | ✅ PASS | 10/May/2026 |

### Frontend (UI & React)
Framework: `Vitest` + `React Testing Library`

| ID | Descripción de la Prueba | Tipo | Resultado | Fecha Ejecución |
|---|---|---|:---:|---|
| `AUTH-F01` | Pantalla Login - Debería renderizar todos los campos visuales correctamente y no colapsar. | Unitaria | ✅ PASS | 10/May/2026 |
| `AUTH-F02` | Pantalla Register - Debería renderizar la pantalla administrativa de forma segura (Mocked Context). | Unitaria | ✅ PASS | 10/May/2026 |

---
