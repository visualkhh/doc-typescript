var createError = require('http-errors');
var helmet = require('helmet');
var cheerio     = require('cheerio');
var interceptor = require('express-interceptor');
import {NextFunction, Request, Response} from 'express';
var express =  require('express');
var orm =  require('orm');
var path = require('path');
var url = require('url');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();
//db
// process.env.MYSQL_HOST,
// process.env.MYSQL_USER,
// process.env.MYSQL_PASSWORD,
// process.env.MYSQL_PORT,
// process.env.MYSQL_DATABASE
const mysqlUrl = "mysql://"+process.env.MYSQL_USER+":"+process.env.MYSQL_PASSWORD+"@"+process.env.MYSQL_HOST+":"+process.env.MYSQL_PORT+"/"+process.env.MYSQL_DATABASE;
const Sequelize = require('sequelize');
//https://jongmin92.github.io/2017/04/08/Node/sequelize/
//http://docs.sequelizejs.com/manual/installation/getting-started
/*
 Sequelize 참고
 DataTypes => http://docs.sequelizejs.com/en/v3/api/datatypes/
 Associations => http://docs.sequelizejs.com/en/v3/api/associations/
 Model Function => http://docs.sequelizejs.com/en/v3/api/model/
 */

// const sequelize = new Sequelize(
//     process.env.MYSQL_DATABASE, // 데이터베이스 이름
//     process.env.MYSQL_USER, // 유저 명
//     process.env.MYSQL_PASSWORD, // 비밀번호
//     {
//         host: process.env.MYSQL_HOST, // 데이터베이스 호스트
//         port: process.env.MYSQL_PORT,
//         dialect: 'mysql', // 사용할 데이터베이스 종류
//         logging: true,
//         operatorsAliases: false,
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     }
// );
// sequelize.define('Persons', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: true
//     }
// });
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
//
//
//
// const persons = sequelize.define('persons', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING
//     }
// });
//
// // force: true will drop the table if it already exists
// persons.sync({force: false}).then(() => {
//     // Table created
//     return persons.create({
//         id: 532,
//         name: 'Hancock'
//     });
// });
//
// persons.findAll().then(users => {
//     console.log(users)
// })





const models = require('./models');
models.sequelize.sync({force: false})
    .then(() => {
        console.log('✓ DB connection success.');
        console.log('  Press CTRL-C to stop\n');
    })
    .catch((err: any) => {
        console.error(err);
        console.log('✗ DB connection error. Please make sure DB is running.');
        process.exit();
    });




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.disable('x-powered-by');
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
        secret : 's3Cur3',
        name : 'sessionId',
    })
);

//////security
app.use((req: Request, res: Response, next: NextFunction)=> {
    req.session!.name = 'name';
    var requrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl,
    });
    console.log('>>> ' + requrl)
    next();
});

//orm
app.use((req: any, res: any, next: any) => {
    req.models = models;
    next();
});
app.get("/aa", function (req: any, res: any) {
    console.log('---' + req.models)
    req.models.user.findAll().then((persons: Array<any>) => {
        res.json(persons);
    })
    // req.models is a reference to models used above in define()
    // req.models.person.find();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);


////////// interceptor
// var finalParagraphInterceptor = interceptor(function(req: any, res: any){
//     return {
//         // Only HTML responses will be intercepted
//         isInterceptable: function(){
//             console.log('interceptor' + req.session);
//             return /text\/html/.test(res.get('Content-Type'));
//         },
//         // Appends a paragraph at the end of the response body
//         intercept: function(body: any, send: any) {
//             var $document = cheerio.load(body);
//             $document('body').append('<p>From interceptor!</p>');
//
//             send($document.html());
//         }
//     };
// })
// app.use(finalParagraphInterceptor);




// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: any) {
    next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
