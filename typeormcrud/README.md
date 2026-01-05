<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Typeorm CRUD mexanizim va SQLite 3
> bu loyhada Typeorm yordamida SQLite bilan CRUD mexanizimi tuzib chiqilgan va pagination korsatib otilgan.

## Typeorm va SQLite nima?🧐
> - TypeORM (Object Relational Mapping)- bu TypeScript va JavaScript uchun  (ORM) tizimi bo'lib, ma'lumotlar bazasi jadvallarini dastur modellariga moslashtirish orqali ma'lumotlar bazasi o'zaro ta'sirini soddalashtirish uchun mo'ljallangan [Typeorm](https://typeorm.io/)

> -  SQLite - bu kichik, tezkor, mustaqil, yuqori ishonchlilikdagi, to'liq funksiyali SQL ma'lumotlar bazasi dvigatelini amalga oshiradigan C tilidagi kutubxona.[SQLite](https://www.sqlite.org/)

## ✍️ misollar
### 📥 o'rnatish
```bash
# nest.js orqali ishlash mexanizmini global ornatish 
$ npm i -g @nestjs/cli

# tekshirish
$ nest --version

# yangi loyha yaratish nest.js orqali
# yarn paket menejri yordamida yaratish tavisya qilaman
$ nest new loyha-nomi

# loyhaga kirish
$ cd loyha-nomi

# kerakli kutubhonalarni o'rnatish👇

# typeorm va sqlite kutubhonlarini o'rnatish
$ yarn add @nestjs/typeorm typeorm sqlite3

# documentation’ni avtomatik shakllantirish uchun
$ yarn add @nestjs/swagger swagger-ui-express

# validatsiya uchun kerak bolgan kutubhonlarni o'rnatish
$ yarn add class-validator class-transformer

# yangi resurs yaratish
$ nest g res resurs-nomi
```
 ### typeorm'ni sozlash 🔧
 app.module.ts
 ```ts
  imports: [
    // typeorm umumiy konfiguratsiy beriladi
    TypeOrmModule.forRoot({
      //baza turi belgilanadi
      type:'sqlite',
      //db faqyni nom beriladi
      database:`.db/DB-nomi.sqlite`,
      //entitiylar ni umumiy belgialash 
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //yoki yaratilgan entitiy nomlarini qolda kritishimiz mumkin(ixtiyoriy)
      entities:[entity-nomi],
      // entitit'dayi ozgarishlarni doimiy DB ga yuboradi
      synchronize:true
    }),
  ]
 ```
 ### swagger'ni sozlash 🔧
 main.ts
 ```ts
//  Swagger konfiguratsiyasi uchun DocumentBuilder yaratamiz
const swag = new DocumentBuilder()
// API hujjatining sarlavhasi
  .setTitle('ixtiyoriy-sarlavha')   
  // API tavsifi (description) → foydalanuvchi nima qilishi haqida yozish             
  .setDescription('laptop stare siste') 
  // API versiyasi → version raqami “1.0”
  .setVersion('1.0')   
  // Barcha konfiguratsiyalarni yakunlaydi va DocumentBuilder’dan **swagger konfiguratsiyasini** yaratadi               
  .build();                            

//  Swagger hujjatini yaratish uchun factory funksiyasini tayyorlaymiz 
const documentFactory = () => SwaggerModule.createDocument(app, swag);

//  Swagger UI ni brauzerda `/docs` path orqali sozlash
//  'docs' → brauzer URL qismi: http://localhost:3000/docs 
SwaggerModule.setup('docs', app, documentFactory)
 ```

  ### vlalidatsiya'ni sozlash 🔧
 main.ts
 ```ts
//  Global pipe sifatida ValidationPipe ni ishlatamiz
app.useGlobalPipes(
  // ValidationPipe — DTO’larni validatsiya qilish uchun NestJS built-in pipe
  new ValidationPipe({               
     //  DTO’da yo‘q maydonlarni avtomatik o‘chiradi (faqat DTO’da belgilangan property qabul qilinadi)
    whitelist: true,                
    //  DTO’da bo‘lmagan property kelsa xato beradi (bad request)
    forbidNonWhitelisted: true,     
     //  Kiruvchi ma’lumotlarni DTO klassiga **avtomatik transform qiladi**, masalan string → number
    transform: true,               
    //  Null qiymatli property’larni transform va validatsiyadan o‘tkazadi (false → tekshiriladi) 
    skipNullProperties: false        
  })
)
 ```
 ### entitiy nima🧐
 >Database jadvalining “modeli” bo‘lib, jadvaldagi ustun (column) va qator (row) strukturasini TypeScript klassi orqali belgilaydi.

laptop.entity.ts
```ts
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//  Entity decorator → Bu class DB jadvali ekanini bildiradi
@Entity()
export class laptopEntity {
    
    //  PrimaryGeneratedColumn → primary key, avtomatik raqamlanadi
    @PrimaryGeneratedColumn()
    id: number;

    //  Oddiy column → nullable:true → maydon bo‘sh bo‘lishi mumkin
    @Column({ nullable: true }) 
    name: string;  // laptop nomi

    //  Module column → laptop moduli, nullable:true
    @Column({ nullable: true })
    module: string;

    //  Memory column → GB o‘lchovida xotira, nullable:true
    @Column({ nullable: true })
    memory_GB: number;

    //  Deleted flag → soft delete uchun, default:false
    @Column({ nullable: false, default: false, type: 'boolean' })
    delated: boolean; // laptop o‘chirildi yoki yo‘q

    //  CreatedAt column → record qachon yaratildi, avtomatik to‘ldiriladi
    @CreateDateColumn()
    createdAt: Date;

    //  UpdatedAt column → record oxirgi marta qachon o‘zgartirildi, avtomatik
    @UpdateDateColumn()
    updatedAt: Date;
}
```

### DTO nima🧐
>DTO (Data Transfer Object) —
Ma’lumotni server va client o‘rtasida uzatish uchun ishlatiladigan obyekt.

create-laptop.dto.ts
```ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber,  IsString } from "class-validator"; 

export class CreateLaptopDto {

  @ApiProperty()           // Swagger UI’da maydonni ko‘rsatadi
  @IsString()              // Validatsiya: qiymat string bo‘lishi kerak
  name: string;            // Laptop nomi

  @ApiProperty()
  @IsString()
  module: string;          // Laptop moduli (masalan: i5, Ryzen 5)

  @ApiProperty()
  @IsNumber()              // Validatsiya: qiymat number bo‘lishi kerak
  memory_GB: number;       // RAM miqdori (GB)

  @ApiProperty()
  @IsNumber()
  brandId: number;         // Brand id, boshqa jadval bilan bog‘lanish uchun
}
```
update-laptop.dto.ts
```ts
import { PartialType } from '@nestjs/mapped-types'; 
import { CreateLaptopDto } from './create-laptop.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmpty, IsNumber, Min } from 'class-validator';

// CreateLaptopDto da gi barch propertiylarni qoshadi
export class UpdateLaptopDto extends PartialType(CreateLaptopDto) {
  @ApiProperty()          // Swagger UI’da maydon
  @IsNumber()             // Validatsiya: number bo‘lishi kerak
  @IsDefined()            // Validatsiya: qiymat undefined bo‘lmasligi kerak
  // @IsEmpty()           // Comment qilingan → hozir ishlatilmayapti
  @Min(1)                 // Minimal qiymat 1 dan kichik bo‘lmasligi kerak
  id: number;             // O‘zgartirilayotgan laptop id
}
```

list.dto.ts
```ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";

export class ListDto {
  @ApiProperty()           // Swagger UI’da maydon
  @IsNumberString()        // Validatsiya: number string bo‘lishi kerak 
  page: number;            // Sahifa raqami

  @ApiProperty()
  @IsNumberString()
  size: number;            // Har sahifadagi elementlar soni

  @ApiProperty({ required: false }) // Swagger UI’da ixtiyoriy maydon
  @IsString()              //string formatda bolmog'i lozim
  @IsOptional()            // Requestda bo‘lmasa ham bo‘ladi
  keyword?: string;        // Qidiruv kaliti (search keyword)
}
```

### controller nima🤔
>Client so‘rovlarini qabul qiluvchi va ularga javob beruvchi NestJS klassi!
 
 laptop.controller.ts
 ```ts

import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query,  } from '@nestjs/common';
import { LaptopService } from './laptop.service';
import { CreateLaptopDto } from './dto/create-laptop.dto';
import { UpdateLaptopDto } from './dto/update-laptop.dto';
import { ListDto } from './dto/list.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

//asosiy routerni 'laptop' deb belgilandi
@Controller('laptop')
export class LaptopController {
  //  Constructor orqali service injekt qilinadi
  constructor(private readonly laptopService: LaptopService) {}

  //  POST  yangi laptop yaratish
  @Post()
  //kirib keluvchi malumotlarni 'CreateLaptopDto' turiga mosligi belgilanadi va payload parametriga briktiriladi
  create(@Body() payload: CreateLaptopDto) { 
    // Konsolga tekshirish uchun log
    console.log('accepted');                  
    // Service orqali yangi laptop yaratadi
    return this.laptopService.create(payload); 
  }

  //  PUT laptop ma’lumotini yangilash
  @Put()
  //kirib keluvchi malumotlarni 'UpdateLaptopDto' turiga mosligi belgilanadi va payload parametriga briktiriladi
  update(@Body() payload: UpdateLaptopDto){ 
    // Service orqali yangilash funksiyasi
    return this.laptopService.updateEX(payload); 
  }

  // GET  barcha laptoplarni olish
  @Get()
  findAll() {
    // Service orqali barcha laptoplarni qaytaradi
    return this.laptopService.findAll(); 
  }

  //  GET  paginatsiya va search bilan laptoplar sonini olish
  @Get('list')
  // @Query()  URL query parametrlari 'ListDto' turiga mosligi belgilanadi va payload parametriga briktiriladi
  async getCount(@Query() payload: ListDto){ 
    // Service orqali count va list qaytaradi
    return this.laptopService.findCounts(payload); 
  }

  //  GET /laptop/:id → bitta laptopni id bo‘yicha olish
  @Get(':id')
  findOne(@Param('id') id: string){ // @Param('id') → URL parametri
    return this.laptopService.findOne(+id); // Service orqali bitta laptopni qaytaradi, +id → string → number
  }

  // DELETE /laptop/:id → laptopni o‘chirish
  @Delete(':id')
   // URL parametri 'id' uniga number turi briktiriladi
  remove(@Param('id') id: number){
    // Service orqali laptopni o‘chiradi
    return this.laptopService.remove(+id); 
  }
}
 ```
 ### service nima🤔
 >Service — Biznes logikani bajaradigan NestJS klassi.

 laptop.service.ts
 ```ts
import { Injectable } from '@nestjs/common';          
import { CreateLaptopDto } from './dto/create-laptop.dto'; 
import { UpdateLaptopDto } from './dto/update-laptop.dto';
import { DataSource, Raw } from 'typeorm';              
import { laptopEntity } from 'src/entities/laptop.entity';
import { ListDto } from './dto/list.dto';

@Injectable() 
export class LaptopService {
  //DataSource inject qilinadi (DB bilan ishlash uchun)
  constructor(private readonly db: DataSource){}

/**
 *     Yangi laptop yaratish
*/
//controllerdan kelgan malumotlarni 'CreateLaptopDto' turida ekanligini belgilab payload parametriga saqlaymiz
  async create(payload: CreateLaptopDto) {
    // DB ga yangi entity saqlash
    return await this.db.manager.save(laptopEntity, { 
      //dto key larni  entitiy keylari bilan moslashtiramiz 
        name: payload.name,
        module: payload.module,
        memory_GB: payload.memory_GB,
    }).then((res)=>{
      // javob: muvaffaqiyatli yaratildi
      return {ok:true, message:'created'} 
    })
  }

  /**
   * Laptop ma’lumotini yangilash
   */
  //controllerdan kelgan malumotlarni 'UpdateLaptopDto' turida ekanligini belgilab payload parametriga saqlaymiz
  updateEX(payload: UpdateLaptopDto): any {
    // DB dagi malumotlarni yangilaymiz
    return this.db.manager.update(laptopEntity, 
    // qaysi record yangilanadi (where)
      {id: payload.id},                         
      // yangilanishi kerak bo‘lgan fieldlar
      {name: payload.name,                     
       module: payload.module,
       memory_GB: payload.memory_GB
      }).then((res:any)=>{
        return {
          // affected yani ozgarish aniqlanda  record yangilandi
          ok: res?.affected > 0 ? true : false,          
          message: res?.affected > 0 ? 'updated' : 'no changes' // javob xabar
        };
      });
  }

  /**
   *  Barcha laptoplarni olish
   */
  async findAll() {
    // barcha recordlarni olish
     const laptop = await this.db.manager.find(laptopEntity); 
     // natijani qaytarish
     return laptop; 
  }

  /**
   *  Bitta laptopni ID bo‘yicha olish
   */
  findOne(id: number) {
    return this.db.manager.find(laptopEntity,{
// qaysi malumotni yangialsh 
      where: {id: id} 
    });
  }

  /**
   *  Laptoplarni paginatsiya va search bilan olish
   */
  async findCounts(payload: ListDto) {
    return await this.db.manager
      .findAndCount(laptopEntity, {
        where: [
          // name bo‘yicha qidiruv
          { name: Raw((alias) => `${alias} like "%${payload.keyword ?? ''}%"`) }, 
          // module bo‘yicha qidiruv
          { module: Raw((alias) => `${alias} like "%${payload.keyword ?? ''}%"`) }, 
        ],
        skip: (payload.page - 1) * payload.size, // pagination → nechta elementni o'tkazib yuborish
        take: payload.size,                      // pagination → nechta element olish
        order: { createdAt: 'DESC' },           // eng oxirgi yaratganlarni birinchi ko'rsat
      })
      .then((list) => {
        return {
          total: list[1],  // jami recordlar soni
          data: list[0],   // olingan recordlar
        };
      });
  }

  //  Laptopni soft delete qilish
  async remove(id: number) {
    // shart: id mos va deleted=false bo‘lgan recordni delated: true ga o‘zgartiradi
    return await this.db.manager.update(laptopEntity, {id: id, deleted: false}, {delated: true}) 
    .then((res:any)=>{
      return{
        ok: res?.affected > 0 ? true : false,              // o'garish aniqlansa true  qaytaradi
        message: res?.affected > 0 ? 'Delated' : 'not delated' // javob xabar
      }
    })
  }
}
```
## 🏁 Loyihani ishga tushirish

Quyidagi qadamlarni bajarib, NestJS laptop API loyihasini ishga tushiring:

1. **Loyihani klonlash yoki yuklab olish**
```bash
$ git clone <repository-url>
$ cd <project-folder>
$ yarn install
```














