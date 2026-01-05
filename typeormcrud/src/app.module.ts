import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaptopModule } from './laptop/laptop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { laptopEntity } from './entities/laptop.entity';


@Module({

  imports: [
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:`.db/laptopsavdo.sqlite`,
      entities:[laptopEntity,],
      synchronize:true
    }),
    LaptopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 