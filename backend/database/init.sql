CREATE TYPE user_role AS ENUM ('ASESOR', 'GERENTE', 'ADMIN');

CREATE TABLE Usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol user_role NOT NULL
);
