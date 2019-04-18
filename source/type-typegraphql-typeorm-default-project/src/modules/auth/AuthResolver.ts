import {Resolver, Mutation, Arg, Ctx, Query} from "type-graphql";
import { redis } from "../../redis";
import {MyContext} from "../../types/MyContext";
import {Adm} from "../../entity/Adm";
import {admSessionIDPrefix, sessionPrefix} from "../constants/redisPrefixes";
import {getConnection} from "typeorm";
import {logger} from "../middleware/logger";
import {Auth} from "../../entity/Auth";
import {authService} from "../../service/AuthService";

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


}
