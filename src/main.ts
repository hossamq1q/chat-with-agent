import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = process.env;
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, Range',
    exposedHeaders: 'Accept-Ranges, Content-Range, Content-Length',
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  try {
    await app.listen(PORT, () =>
      console.log('server is running on port ' + PORT),
    );
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
