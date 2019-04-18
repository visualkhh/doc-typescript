import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
// import { ObjectType, Field, ID, Root } from "type-graphql";
import { ObjectType, Field, ID} from "type-graphql";
import {Auth} from "./Auth";
import {logger} from "../middleware/logger";
import {authService} from "../service/AuthService";

@ObjectType()
@Entity({name:'T_ADM'})
export class Adm extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({name:'ADM_SEQ'})
  admSeq: number;

  @Field({nullable : true})
  @Column({name: "ADM_LGIN_ID"})
  admLginId: string;

  @Column({name: "ADM_LGIN_PW"})
  admLginPw: string;

  @Field({nullable : true})
  @Column({name: "ADM_NM"})
  admNm: string;

  @Field({nullable : true})
  @Column({name: "USE_YN"})
  useYn: string;

  @Column({name: "LGIN_FAIL_CNT"})
  lginFailCnt: number;

  @Field({nullable : true})
  @Column({name: "CORP_GRP_SEQ"})
  corpGrpSeq: number;

  @Field(type => [Auth], {nullable : true})
  async auths() {
    // logger.debug('ss '+this.admSeq)
        return await authService.findByAdmLoginId(this.admLginId);
  }
  // get auths(): Auth[] | undefined {
  //   // logger.debug('ss '+this.admSeq)
  //       return authService.findByAdmLoginId(this.admLginId);
  // }
  // auths: Auth[];
  // get auths(): Auth[] | any {
  //   return 'str';
  // }
  // get auths(): Auth[] | undefined {
  //   return [];
  // }

    // @Field(type => Auth[], {nullable : true})
    // dada: Auth[];
}
