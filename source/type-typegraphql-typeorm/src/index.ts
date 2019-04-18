import "reflect-metadata"
import {ApolloServer} from "apollo-server-express";
import * as Express from "express"
import {buildSchema, Resolver, Query} from 'type-graphql';


@Resolver()
class HelloResolver{


    @Query(() => String, {name: 'helloWorldddd', nullable: true, description: "설명"})
    async hello() {
        return "Hell";
    }
}

const main = async () => {

    const schema = await buildSchema({
        resolvers: [HelloResolver],
    });

    const app = Express();
    const apolloServer = new ApolloServer({schema});
    apolloServer.applyMiddleware({app})

    app.listen(4000, () => {
        console.log('http://localhost:4000/graphql');
    })
};

main();