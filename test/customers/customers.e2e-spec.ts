import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { v4 } from 'uuid';

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
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body['name']).toEqual('John Doe');
        expect(res.body['email']).toEqual('john.doe@gmail.com');
        expect(res.body['birthdate']).toEqual(
          new Date('2000-06-01').toISOString(),
        );
        expect(res.body['cpf']).toEqual('45225685255');
        expect(res.body['phone']).toEqual(null);
      });
  });

  it('should return 200 created when finding all', () => {
    return request(app.getHttpServer())
      .get('/api/customers')
      .set('Accept', 'application/json')
      .expect(200);
  });

  it('should return 404 created when get by nonexistent id', () => {
    return request(app.getHttpServer())
      .get(`/api/customers/${v4()}`)
      .set('Accept', 'application/json')
      .expect(404);
  });

  it('should return 400 created when get by wrong id format', () => {
    return request(app.getHttpServer())
      .get(`/api/customers/${Math.random()}`)
      .set('Accept', 'application/json')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
