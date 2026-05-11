const request = require('supertest');
const app = require('../index');
const pool = require('../db');
const bcrypt = require('bcryptjs');

describe('Auth & Security API', () => {
  let adminToken;
  let userToken;
  const adminEmail = `admin_${Date.now()}@priority.com`;
  const adminPass = 'adminpass';
  const testEmail = `test_${Date.now()}@priority.com`;
  const testPassword = 'securepassword123';

  beforeAll(async () => {
    // Inyectar un SuperAdministrador directamente en la BD para probar el registro
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(adminPass, salt);
    await pool.query(
      'INSERT INTO Usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4)',
      ['Super Admin', adminEmail, hashed, 'ADMIN']
    );

    // Obtener token del admin
    const res = await request(app).post('/api/auth/login').send({ email: adminEmail, password: adminPass });
    adminToken = res.body.data.token;
  });

  afterAll(async () => {
    // Limpiar los usuarios de prueba
    await pool.query('DELETE FROM Usuarios WHERE email IN ($1, $2)', [testEmail, adminEmail]);
    await pool.end(); // Cerrar el pool para que Jest termine
  });

  it('1. POST /api/auth/register - Debería denegar acceso sin token (401)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ nombre: 'X', email: 'x@x.com', password: '123', rol: 'ASESOR' });

    expect(res.statusCode).toBe(401);
  });

  it('2. POST /api/auth/register - Debería registrar un nuevo usuario usando token ADMIN', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        nombre: 'Usuario Prueba',
        email: testEmail,
        password: testPassword,
        rol: 'ASESOR'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.usuario).toHaveProperty('id');
    expect(res.body.data.usuario.email).toBe(testEmail);
  });

  it('3. POST /api/auth/register - Debería rechazar un correo duplicado', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        nombre: 'Otro Usuario',
        email: testEmail, // El mismo correo
        password: 'anotherpassword',
        rol: 'ASESOR'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('El correo ya está registrado');
  });

  it('4. POST /api/auth/login - Debería iniciar sesión y retornar un JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: testPassword
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('token');
    
    // Guardar el token del usuario normal (ASESOR)
    userToken = res.body.data.token;
  });

  it('5. POST /api/auth/register - Debería denegar el registro si el rol NO es ADMIN (403)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .set('Authorization', `Bearer ${userToken}`) // Token de ASESOR
      .send({ nombre: 'Y', email: 'y@y.com', password: '123', rol: 'ASESOR' });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/Acceso denegado/);
  });

  it('6. POST /api/auth/login - Debería rechazar contraseñas incorrectas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Credenciales inválidas');
  });

  it('7. GET /api/usuarios/me - Debería permitir acceso con un JWT válido', async () => {
    const res = await request(app)
      .get('/api/usuarios/me')
      .set('Authorization', `Bearer ${userToken}`);
      
    expect(res.statusCode).toBe(200);
    expect(res.body.data.usuario.email).toBe(testEmail);
  });
});
