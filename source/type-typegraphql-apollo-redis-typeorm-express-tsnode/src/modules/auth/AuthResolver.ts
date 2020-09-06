import {Resolver, Mutation, Arg, Ctx, Query} from "type-graphql";
import { redis } from "../../redis";
import {MyContext} from "../../types/MyContext";
import {Adm} from "../../entity/Adm";
import {admSessionIDPrefix, sessionPrefix} from "../constants/redisPrefixes";
import {getConnection, getRepository, getManager} from "typeorm";
import {logger} from "../middleware/logger";
import {Auth} from "../../entity/Auth";
import {authService} from "../../service/AuthService";
import {Auth2} from "../../entity/Auth2";
import {PostCategory} from "../../entity/PostCategory";

@Resolver()
export class AuthResolver {

    @Query(() => [Auth], {nullable: true})
    async auths(@Arg("admLginId") admLginId: string, @Ctx() ctx: MyContext): Promise<Auth[] | undefined> {
        // if (!ctx.req.session!.adm) {
        //     return undefined;
        // }
      // const s = await getConnection().query(Auth.findByAdmLoginId, [admLginId, admLginId]) as Auth[];
      //   console.log(s);
        const s = authService.findByAdmLoginId(admLginId);
        // getConnection().createQueryBuilder().select('auth').fro
        // logger.debug("server started osssssssssl");
        return s;
    }
    @Query(() => [Auth2], {nullable: true})
    async auth2s(@Arg("admLginId") admLginId: string, @Ctx() ctx: MyContext): Promise<Auth2[] | undefined> {
        return await getRepository(Auth2).find({where: {admLginId}});
       // return await Auth2.find({where: {admLginId}})
       //  return await getManager().find(Auth2, { admLginId });
    }
    @Query(() => [PostCategory], {nullable: true})
    async postCategorys(@Arg("admLginId") admLginId: string, @Ctx() ctx: MyContext): Promise<PostCategory[] | undefined> {
        // return await getRepository(Auth2).find({where: {admLginId}});
       // return await Auth2.find({where: {admLginId}})
       //  return await getManager().find(PostCategory, { admLginId });

        const postCategories = await getConnection().manager.find(PostCategory);
        // postCategories.length.should.be.equal(2);
        return postCategories;
    }


}
