// import {ViewEntity, Column, Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ViewEntity, PrimaryColumn, ViewColumn} from "typeorm";
// // import {} from "typeorm";
// // import {Column} from "type-graphql/decorators/";
// // import {ViewEntity} from "../../../../../src/decorator/entity-view/ViewEntity";
@ObjectType()
// // @Entity
@ViewEntity({
    expression: ` SELECT \n" +
    "   X.ADM_SEQ      as admSeq,\n" +
    "   X.ADM_LGIN_ID  as admLginId,\n" +
    "   X.AUTH_ID      as auth_id,\n" +
    "   X.AUTH_NM      as auth_nm,\n" +
    "   X.AUTH_URL_SEQ as auth_url_seq,\n" +
    "   X.CRUD_TYPE_CD as crud_type_cd,\n" +
    "   X.URL_SEQ      as url_seq,\n" +
    "   U.MENU_NM      as menuNm,\n" +
    "   U.MENU_NM_EN   as menuNmEn,\n" +
    "   U.MENU_LVL     as menuLvl,\n" +
    "   U.MENU_ICON    as menuIcon,\n" +
    "   U.MENU_ORD     as menuOrd,\n" +
    "   U.URL          as url,\n" +
    "   U.URL_XPLN     as urlXpln,\n" +
    "   U.URL_XPLN_EN  as urlXpln_en,\n" +
    "   U.USE_YN       as useYn,\n" +
    "   U.HDDN_YN      as hddnYn,\n" +
    "   U.PRNT_URL_SEQ as prntUrlSeq" +
    " from   ( \n" +
    " \t\tselect  A.ADM_SEQ, A.ADM_LGIN_ID, D.AUTH_ID, D.AUTH_NM, E.AUTH_URL_SEQ, E.CRUD_TYPE_CD, E.URL_SEQ \n" +
    " \t\tfrom   (select  ADM_SEQ, ADM_LGIN_ID, CORP_GRP_SEQ \n" +
    " \t\t\t\tfrom    T_ADM \n" +
    " \t\t) A\n" +
    " \t\t, T_CORP_GRP                         B \n" +
    " \t\t, T_CORP_GRP_AUTH                    C \n" +
    " \t\t, T_AUTH                             D \n" +
    " \t\t, T_AUTH_URL                         E \n" +
    " \t\twhere   1 = 1 \n" +
    " \t\tand     A.CORP_GRP_SEQ  =   B.CORP_GRP_SEQ \n" +
    " \t\tand     A.CORP_GRP_SEQ  =   C.CORP_GRP_SEQ \n" +
    " \t\tand     C.AUTH_ID       =   D.AUTH_ID \n" +
    " \t\tand     C.AUTH_ID       =   E.AUTH_ID \n" +
    " \t\tunion \n" +
    " \t\tselect  A.ADM_SEQ, A.ADM_LGIN_ID, C.AUTH_ID, C.AUTH_NM, D.AUTH_URL_SEQ, D.CRUD_TYPE_CD, D.URL_SEQ \n" +
    " \t\tfrom   (select  ADM_SEQ, ADM_LGIN_ID, CORP_GRP_SEQ \n" +
    " \t\t\t\tfrom    T_ADM \n" +
    " \t\t) A \n" +
    " \t\t, T_ADM_AUTH                         B \n" +
    " \t\t, T_AUTH                             C \n" +
    " \t\t, T_AUTH_URL                         D \n" +
    " \t\twhere   1 = 1 \n" +
    " \t\tand     A.ADM_SEQ       =   B.ADM_SEQ \n" +
    " \t\tand     B.AUTH_ID       =   C.AUTH_ID \n" +
    " \t\tand     C.AUTH_ID       =   D.AUTH_ID \n" +
    ") X LEFT JOIN T_URL U ON X.URL_SEQ = U.URL_SEQ WHERE U.USE_YN='Y'  ORDER BY U.MENU_LVL, U.PRNT_URL_SEQ, U.MENU_ORD `
})
// @Entity({name:
//     ` (SELECT
//        X.ADM_SEQ      as admSeq,
//        X.ADM_LGIN_ID  as admLginId,
//        X.AUTH_ID      as auth_id,
//        X.AUTH_NM      as auth_nm,
//        X.AUTH_URL_SEQ as auth_url_seq,
//        X.CRUD_TYPE_CD as crud_type_cd,
//        X.URL_SEQ      as url_seq,
//        U.MENU_NM      as menuNm,
//        U.MENU_NM_EN   as menuNmEn,
//        U.MENU_LVL     as menuLvl,
//        U.MENU_ICON    as menuIcon,
//        U.MENU_ORD     as menuOrd,
//        U.URL          as url,
//        U.URL_XPLN     as urlXpln,
//        U.URL_XPLN_EN  as urlXpln_en,
//        U.USE_YN       as useYn,
//        U.HDDN_YN      as hddnYn,
//        U.PRNT_URL_SEQ as prntUrlSeq
//      from   (
//      select  A.ADM_SEQ, A.ADM_LGIN_ID, D.AUTH_ID, D.AUTH_NM, E.AUTH_URL_SEQ, E.CRUD_TYPE_CD, E.URL_SEQ
//      from   (select  ADM_SEQ, ADM_LGIN_ID, CORP_GRP_SEQ
//      from    T_ADM
//      ) A
//      , T_CORP_GRP                         B
//      , T_CORP_GRP_AUTH                    C
//      , T_AUTH                             D
//      , T_AUTH_URL                         E
//      where   1 = 1
//      and     A.CORP_GRP_SEQ  =   B.CORP_GRP_SEQ
//      and     A.CORP_GRP_SEQ  =   C.CORP_GRP_SEQ
//      and     C.AUTH_ID       =   D.AUTH_ID
//      and     C.AUTH_ID       =   E.AUTH_ID
//      union
//      select  A.ADM_SEQ, A.ADM_LGIN_ID, C.AUTH_ID, C.AUTH_NM, D.AUTH_URL_SEQ, D.CRUD_TYPE_CD, D.URL_SEQ
//      from   (select  ADM_SEQ, ADM_LGIN_ID, CORP_GRP_SEQ
//      from    T_ADM
//      ) A
//      , T_ADM_AUTH                         B
//      , T_AUTH                             C
//      , T_AUTH_URL                         D
//      where   1 = 1
//      and     A.ADM_SEQ       =   B.ADM_SEQ
//      and     B.AUTH_ID       =   C.AUTH_ID
//      and     C.AUTH_ID       =   D.AUTH_ID
//     ) X LEFT JOIN T_URL U ON X.URL_SEQ = U.URL_SEQ WHERE U.USE_YN='Y'  ORDER BY U.MENU_LVL, U.PRNT_URL_SEQ, U.MENU_ORD) `
// })
// @Entity({name:
//     `select\  A.ADM_SEQ`
// })
export class Auth2 extends BaseEntity {
    @PrimaryColumn({name: "admSeq"})
    // @Column({name: "admSeq"})
    // @Field(() => ID)
    @ViewColumn()
    @Field({nullable:true})
    admSeq: string;
    @ViewColumn()
    // @Column({name: "admLginId"})
    @Field({nullable:true})
    admLginId: string;
    // @Column()
    // @Field({nullable:true})
    // auth_id: string;
    // @Column()
    // @Field({nullable:true})
    // auth_nm: string;
    // @Column()
    // @Field({nullable:true})
    // auth_url_seq: string;
    // @Column()
    // @Field({nullable:true})
    // crud_type_cd: string;
    // @Column()
    // @Field({nullable:true})
    // url_seq: string;
    // @Column()
    // @Field({nullable:true})
    // menuNm: string;
    // @Column()
    // @Field({nullable:true})
    // menuNmEn: string;
    // @Column()
    // @Field({nullable:true})
    // menuLvl: string;
    // @Column()
    // @Field({nullable:true})
    // menuIcon: string;
    // @Column()
    // @Field({nullable:true})
    // menuOrd: string;
    // @Column()
    // @Field({nullable:true})
    // url: string;
    // @Column()
    // @Field({nullable:true})
    // urlXpln: string;
    // @Column()
    // @Field({nullable:true})
    // urlXpln_en: string;
    // @Column()
    // @Field({nullable:true})
    // useYn: string;
    // @Column()
    // @Field({nullable:true})
    // hddnYn: string;
    // @Column()
    // @Field({nullable:true})
    // prntUrlSeq: string;
}
