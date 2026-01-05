import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class laptopEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({nullable:true}) 
    name:string;

    @Column({nullable:true})
    module:string;

    @Column({nullable:true})
    memory_GB:number;

    @Column({nullable:false, default:false, type:'boolean'})
    delated:boolean

    @CreateDateColumn()
    createdAt:Date

     @UpdateDateColumn()
     updatedAt:Date
}