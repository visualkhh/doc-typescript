import { Request, Response, NextFunction } from "express";
import express from "express";
var router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
