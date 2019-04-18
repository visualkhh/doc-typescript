// import {ViewEntity, ViewColumn, Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
// // import {} from "typeorm";
// // import {ViewColumn} from "type-graphql/decorators/";
// // import {ViewEntity} from "../../../../../src/decorator/entity-view/ViewEntity";
@ObjectType()
// // @Entity
// @ViewEntity({
//     expression: `
//         SELECT "post"."id" AS "id", "post"."name" AS "name", "category"."name" AS "categoryName"
//         FROM "post" "post"
//         LEFT JOIN "category" "category" ON "post"."categoryId" = "category"."id"
//     `
// })
// @View
export class Auth {
    @Field({nullable:true})
    admSeq: string;
    @Field({nullable:true})
    admLginId: string;
    @Field({nullable:true})
    auth_id: string;
    @Field({nullable:true})
    auth_nm: string;
    @Field({nullable:true})
    auth_url_seq: string;
    @Field({nullable:true})
    crud_type_cd: string;
    @Field({nullable:true})
    url_seq: string;
    @Field({nullable:true})
    menuNm: string;
    @Field({nullable:true})
    menuNmEn: string;
    @Field({nullable:true})
    menuLvl: string;
    @Field({nullable:true})
    menuIcon: string;
    @Field({nullable:true})
    menuOrd: string;
    @Field({nullable:true})
    url: string;
    @Field({nullable:true})
    urlXpln: string;
    @Field({nullable:true})
    urlXpln_en: string;
    @Field({nullable:true})
    useYn: string;
    @Field({nullable:true})
    hddnYn: string;
    @Field({nullable:true})
    prntUrlSeq: string;
}

export namespace Auth {
    export const findByAdmLoginId = " SELECT \n" +
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
        "\t\t\t\t\t\t                 where   ADM_LGIN_ID =   ?\n" +
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
        "\t\t\t\t\t\t                 where   ADM_LGIN_ID =   ?\n" +
        " \t\t) A \n" +
        " \t\t, T_ADM_AUTH                         B \n" +
        " \t\t, T_AUTH                             C \n" +
        " \t\t, T_AUTH_URL                         D \n" +
        " \t\twhere   1 = 1 \n" +
        " \t\tand     A.ADM_SEQ       =   B.ADM_SEQ \n" +
        " \t\tand     B.AUTH_ID       =   C.AUTH_ID \n" +
        " \t\tand     C.AUTH_ID       =   D.AUTH_ID \n" +
        ") X LEFT JOIN T_URL U ON X.URL_SEQ = U.URL_SEQ WHERE U.USE_YN='Y'  ORDER BY U.MENU_LVL, U.PRNT_URL_SEQ, U.MENU_ORD ";
}