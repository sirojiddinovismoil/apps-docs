import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //validation 
app.useGlobalPipes(new ValidationPipe({
  whitelist: true, 
  forbidNonWhitelisted: true,
   transform: true,
   skipNullProperties:false
}))
// swager docs
const swag=new DocumentBuilder()
.setTitle('ecommers')
.setDescription('laptop stare siste')
.setVersion('1.0')
.build();
const documentFactory=()=>SwaggerModule.createDocument(app, swag);
SwaggerModule.setup('docs',app, documentFactory)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
