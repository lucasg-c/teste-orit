import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('CustomersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should return 400 bad request when no body', () => {
    return request(app.getHttpServer())
      .post('/api/customers')
      .send({})
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('should return 201 created when valid body', () => {
    return request(app.getHttpServer())
      .post('/api/customers')
      .send({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        birthdate: '2000-06-01',
        cpf: '45225685255',
      })
      .set('Accept', 'application/json')
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
