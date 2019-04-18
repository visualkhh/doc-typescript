import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

// console.log(process.env.NODE_ENV)
// console.log(process.env)

// create typeorm connection
createConnection().then(connection => {
    const userRepository = connection.getRepository(User);
    // userRepository.createQueryBuilder()
    // create and setup express app
    const app = express();
    // console.log(app.get('env'))
    app.use(bodyParser.json());

    // register routes

    app.get("/users", async function(req: Request, res: Response) {
        // return userRepository.find();
        // res.send(await userRepository.find());
        res.send(await userRepository.query('select * from T_ADM'));
    });

    app.get("/users/:id", async function(req: Request, res: Response) {
        // return userRepository.findOne(req.params.id);
        res.send(await userRepository.findOne(req.params.id));
    });

    app.post("/users", async function(req: Request, res: Response) {
        const user = userRepository.create(req.body);
        return userRepository.save(user);
    });

    // app.put("/users/:id", function(req: Request, res: Response) {
    //     const user = userRepository.findOne(req.params.id);
    //     userRepository.merge(user, req.body);
    //     return userRepository.save(user);
    // });
    //
    // app.delete("/users/:id", async function(req: Request, res: Response) {
    //     return userRepository.remove(req.params.id);
    // });

    // start express server
    app.listen(3000);
});