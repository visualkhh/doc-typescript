import {Resolver, Mutation, Arg, Ctx, Query} from "type-graphql";
// import bcrypt from "bcryptjs";
import { redis } from "../../redis";
import {MyContext} from "../../types/MyContext";
import {Adm} from "../../entity/Adm";
import {User} from "../../entity/User";
import {admSessionIDPrefix, sessionPrefix} from "../constants/redisPrefixes";

@Resolver()
export class AdmLoginResolver {
    @Query(() => [Adm], {nullable: true})
    async adms(@Ctx() ctx: MyContext): Promise<Adm[] | undefined> {
        return Adm.find();
    }
    @Query(() => Adm, {nullable: true})
    async adm(@Ctx() ctx: MyContext): Promise<Adm | undefined> {
        if (!ctx.req.session!.adm) {
            return undefined;
        }
        return Adm.findOne((ctx.req.session!.adm as Adm).admSeq);
    }

    @Mutation(() => Adm, {nullable: true})
    async admLogin(
        @Arg("admLginId") admLginId: string,
        @Arg("admLginPw") password: string,
        @Ctx() ctx: MyContext
    ): Promise<Adm | null> {

        const rdata = await Adm.findOne({where: {admLginId}}).then( it => {
            if (!it) {
                return null;
            }
            const valid = password === it.admLginPw;
            if (!valid) {
                return null;
            }
            if (it.useYn !== 'Y') {
                return null;
            }

            return it;
        });


        if (!rdata) {
            return null;
        }

        const oldSessionId = await redis.get(admSessionIDPrefix + rdata.admSeq);
        if (oldSessionId) {
            redis.del(sessionPrefix + oldSessionId);
        }
        ctx.req.session!.adm = rdata;
        redis.set(admSessionIDPrefix + rdata.admSeq, ctx.req.sessionID)

        return rdata;

    }
}
