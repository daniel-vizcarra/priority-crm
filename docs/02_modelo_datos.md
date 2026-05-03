# Modelo de Datos Inicial (Sprint 1)
La entidad principal actual es `Usuarios`:
- `id`: UUID (Primary Key)
- `nombre`: Varchar(100)
- `email`: Varchar(100) (Unique)
- `password`: Varchar(255) (Hash)
- `rol`: Enum ('ASESOR', 'GERENTE', 'ADMIN')