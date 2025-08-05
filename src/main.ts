import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nagorik Awaj API')
    .setDescription(
      `Nagorik AwajGames API documentation
      <br/><br/>
      <b>Environment</b>: development
      <br/>
      <b>Version</b>: 1.0.0
    `,
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Nagorik Awaj API Docs',
  });

  await app.listen(3000);
}
bootstrap();
