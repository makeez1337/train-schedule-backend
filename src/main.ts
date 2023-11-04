import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { AppModule } from './app.module';
import { classValidatorErrorConvert } from './helpers/class-validator-error-convert';
import { GlobalExceptionsFilter } from './helpers/global-exceptions-filter';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (
        validationErrors: ValidationError[] = [],
      ): HttpException => {
        const convertedResponse = classValidatorErrorConvert(validationErrors);
        return new HttpException(convertedResponse, HttpStatus.BAD_REQUEST);
      },
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionsFilter(httpAdapterHost));

  await app.listen(PORT);
}

bootstrap().then(() => console.log(`Server started on PORT=${PORT}`));
