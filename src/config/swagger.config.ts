import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Time Letters API')
  .setDescription('Time Letters API documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .build(); 