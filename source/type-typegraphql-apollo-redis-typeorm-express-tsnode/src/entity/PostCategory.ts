import {ViewEntity, ViewColumn, Connection} from "typeorm";
import {Adm} from "./Adm";
import {Field, ObjectType} from "type-graphql";
@ObjectType()
// @ViewEntity({
//     expression: (connection: Connection) => connection.createQueryBuilder()
//         .select("post.admSeq", "admSeq")
//         .addSelect("post.admLginId", "admLginId")
//         .from(Adm, "post")
// })
@ViewEntity({ expression: `
    SELECT \`post\`.\`id\` \`id\`, \`post\`.\`name\` AS \`name\`, \`category\`.\`name\` AS \`categoryName\`
    FROM \`post\` \`post\`
    LEFT JOIN \`category\` \`category\` ON \`post\`.\`categoryId\` = \`category\`.\`id\`
`})
export class PostCategory {

    @ViewColumn()
    @Field({nullable:true})
    id: number;

    @ViewColumn()
    @Field({nullable:true})
    name: string;

    @ViewColumn()
    @Field({nullable:true})
    categoryName: string;

}