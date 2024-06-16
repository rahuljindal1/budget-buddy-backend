import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initialiseSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Budget Buddy API')
    .setDescription(
      'API document to provide a comprehensive info of the all the APIs that can be used as part of Buget Buddy app.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}
