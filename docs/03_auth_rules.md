# Reglas de Autenticación y Autorización (Priority CRM)

Este documento establece las políticas de seguridad y control de acceso implementadas en el sistema CRM B2B.

## 1. Política de Registro Corporativo

El sistema está diseñado para un entorno corporativo cerrado. Por medidas estrictas de seguridad:
- **Prohibición de Registro Público:** No existe ninguna vía pública en el Frontend o Backend para que un usuario externo cree una cuenta.
- **Creación de Empleados:** Únicamente los usuarios que posean el rol de `ADMIN` están autorizados para acceder a la ruta protegida de registro (`POST /api/auth/register`) y dar de alta a nuevos empleados en la base de datos.
- **SuperAdministrador Inicial:** El primer administrador del sistema debe ser inyectado obligatoriamente de forma manual directamente en la base de datos PostgreSQL, asegurando el punto de partida de la cadena de confianza.

## 2. Jerarquía de Roles

El sistema maneja un control de acceso basado en roles (RBAC) definido en la base de datos mediante el tipo `ENUM ('ASESOR', 'GERENTE', 'ADMIN')`.

| Rol | Descripción y Permisos |
|---|---|
| **ADMIN** | Nivel máximo. Acceso total a configuraciones del sistema, métricas globales, y la capacidad exclusiva de registrar/eliminar nuevos usuarios. |
| **GERENTE** | Nivel medio. Tiene permisos para visualizar reportes de su equipo, reasignar prospectos entre asesores, y auditar pólizas o negociaciones, pero no puede crear usuarios del sistema. |
| **ASESOR** | Nivel operativo. Limitado a gestionar y ver únicamente a sus propios clientes (prospectos), su propio pipeline comercial y emitir sus respectivas cotizaciones o pólizas. |

## 3. Gestión de Sesiones (Seguridad de Tokens)

La autenticación no mantiene estado en el servidor (Stateless), utilizando **JSON Web Tokens (JWT)**:
- **Algoritmo y Firma:** Los tokens son firmados criptográficamente mediante HS256 utilizando la variable de entorno `JWT_SECRET`.
- **Expiración Estándar:** Cada token tiene un tiempo de vida (TTL) de 24 horas (`1d`), tras lo cual el empleado será forzado a iniciar sesión nuevamente.
- **Almacenamiento en Cliente:** El Frontend almacena el JWT en el `localStorage` y lo adjunta en el header `Authorization: Bearer <token>` en cada petición subsecuente.
- **Middlewares de Intercepción:** 
  - `auth.middleware.js`: Rechaza cualquier petición a rutas protegidas (`401 Unauthorized`) si el token está ausente, manipulado o expirado.
  - `role.middleware.js`: Permite proteger endpoints críticos restringiéndolos jerárquicamente. Ejemplo: Si un Asesor intenta acceder a la ruta de creación de usuarios, recibirá un error `403 Forbidden`.

## 4. Política de Contraseñas

- Todas las contraseñas enviadas en texto plano desde el Frontend son inmediatamente cifradas en el Backend utilizando el algoritmo de hasheo asimétrico **Bcrypt**.
- Se requiere un mínimo de factor de costo de Salt de `10` rondas computacionales, garantizando mitigación efectiva contra ataques de fuerza bruta o de diccionario en caso de una filtración de base de datos.
- Nunca se retornan contraseñas cifradas al Frontend en ninguna consulta a la API.
