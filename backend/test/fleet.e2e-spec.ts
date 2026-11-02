import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';

describe('FleetModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('api/v1');
    await app.init();

    // In a real e2e test, we would seed an admin user and login.
    // For this boilerplate, we assume tests pass if the DI container loads successfully.
    // E2E logic to be expanded as needed.
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/vehicles (GET) - Unauthorized without token', () => {
    return request(app.getHttpServer())
      .get('/api/v1/vehicles')
      .expect(401);
  });

  it('/api/v1/drivers (GET) - Unauthorized without token', () => {
    return request(app.getHttpServer())
      .get('/api/v1/drivers')
      .expect(401);
  });
});
