import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://ristek-sosmed-rifqifarelmuhammad.vercel.app/', 'http://ristek-sosmed-git-main-rifqifarelmuhammad.vercel.app/', 'http://ristek-sosmed.vercel.app/'],
    allowedHeaders: '*',
    credentials: true,
    methods: '*',
    preflightContinue: false,
    optionsSuccessStatus: 204
  }); 

  await app.listen(8000);
}
bootstrap();
