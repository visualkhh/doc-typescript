import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:'T_ADM'})
export class User {

    @PrimaryGeneratedColumn({name:'ADM_SEQ'})
    id: number;

    @Column({name:'ADM_LGIN_ID'})
    firstName: string;

    @Column({name:'ADM_LGIN_PW'})
    lastName: string;

}