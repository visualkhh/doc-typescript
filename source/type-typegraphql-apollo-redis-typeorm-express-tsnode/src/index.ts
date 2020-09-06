import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import {Request, Response} from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnection, getConnectionManager, getConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";
import {Adm} from "./entity/Adm";
import {logger} from "./middleware/logger";
import moment = require("moment");
import {sessionPrefix} from "./modules/constants/redisPrefixes";
import {TypeOrmCustomLogger} from "./middleware/TypeOrmCustomLogger";
import {getConnectionOptions} from "typeorm";
import {Auth2} from "./entity/Auth2";
import {PostCategory} from "./entity/PostCategory";

const main = async () => {
  // createConnection('dev').then((it) => {
  //    const c = getConnection('dev');
  //    console.log(c);
  // });
  // const con = await createConnection(process.env.NODE_ENV||'dev');
  getConnectionOptions().then(connectionOptions => {
      connectionOptions!.entities!.push(PostCategory);
      console.log(connectionOptions.entities);
      return createConnection(Object.assign(connectionOptions, {
          logger: new TypeOrmCustomLogger()
      }))
      // console.log(connectionOptions);
  });
  // const c  = await createConnection();

  //console.log('sss', c);
  //   const defaultConnection = getConnectionManager().get("default");
  //   const secondaryConnection = getConnectionManager().get("dev");
  // const con = await createConnection();
  //  const con = getConnectionManager().get(process.env.NODE_ENV||'default');
  //  const con = getConnectionManager().get('default');
  //   const con = getConnection('default');
  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });

  const apolloServer = new ApolloServer({
    schema,
    // formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "*"
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
          prefix: sessionPrefix
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
        maxAge: 1000 * 60 * 60 * 24 * 10 * 365 // 10 years
      }
    })
  );

    app.get("/test", async function(req: Request, res: Response) {
        console.log('---');
        res.send(await Adm.findOne({admLginId: 'omnifit'}));
    //     // return userRepository.findOne(req.params.id);
    //     // res.send(await userRepository.findOne(req.params.id));
    });

  apolloServer.applyMiddleware({ app });

  // console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  // logger.debug("server started osssssssssl");

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();
