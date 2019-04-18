import { Request, Response, NextFunction } from "express";
import express from "express";
var router = express.Router();

/* GET users listing. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : process.env.MYSQL_HOST,
        user     : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        port     : process.env.MYSQL_PORT,
        database : process.env.MYSQL_DATABASE
    });

    connection.connect();

    connection.query('SELECT * from Persons', function(err: any, rows: any, fields: any) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });

    connection.end();

    res.send('respond with a resource' + req.session);
});
router.get('/w', (req: Request, res: Response, next: NextFunction) => {

    res.send('respond with a resource' + (req as any).models.person);
});

module.exports = router;
