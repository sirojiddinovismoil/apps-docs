import { Injectable,  } from '@nestjs/common';
import { CreateLaptopDto } from './dto/create-laptop.dto';
import { UpdateLaptopDto } from './dto/update-laptop.dto';
import { DataSource, Raw } from 'typeorm';
import { laptopEntity } from 'src/entities/laptop.entity';
import { ListDto } from './dto/list.dto';

@Injectable()
export class LaptopService {
  constructor(private readonly db: DataSource){}
 async create(payload: CreateLaptopDto) {
    return await this.db.manager.save(laptopEntity,{
        name:payload.name,
        module:payload.module,
        memory_GB:payload.memory_GB,
      // brand:{id:payload.brandId}
    }).then((res)=>{
      return {ok:true, message:'created'}
    })
  }
  updateEX( payload: UpdateLaptopDto):any {
    return this.db.manager.update(laptopEntity,
      {id:payload.id},
      {name:payload.name,
        module:payload.module,
        memory_GB:payload.memory_GB
      }).then((res:any)=>{
        return {
          ok:res?.affected > 0 ? true : false,
          message:res?.affected > 0 ? 'updated' : 'no changes'
        };
      });
  }
    async findAll() {
     const laptop= await this.db.manager.find(laptopEntity);
     return laptop 
  }

  findOne(id: number) {
    return this.db.manager.find(laptopEntity,{
      where:{id:id}
    });
  }
  async findCounts(payload: ListDto) {
    return await this.db.manager
      .findAndCount(laptopEntity, {
        where: [
          {
            name: Raw((alias) => `${alias} like "%${payload.keyword ?? ''}%"`),
          },
          {
            module: Raw((alias) => `${alias} like "%${payload.keyword ?? ''}%"`),
          },
        ],
        skip: (payload.page - 1) * payload.size,
        take: payload.size,
        order: {
          createdAt: 'DESC',
        },
      })
      .then((list) => {
        return {
          total: list[1],
          data: list[0],
        };
      });
  }
  async remove(id: number) {
    return await this.db.manager.update(laptopEntity,{id:id, deleted:false}, {delated:true})
    .then((res:any)=>{
      return{
        ok:res?.affected > 0 ? true: false,
        message: res?.affected > 0 ? 'Delated' : 'not delated'
      }
    })
  }
}
