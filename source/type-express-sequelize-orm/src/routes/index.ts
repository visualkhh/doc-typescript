import { Request, Response, NextFunction } from "express";
import express from "express";
var router = express.Router();

/* GET home page. */
router.get('/zz', (req: Request, res: Response, next: NextFunction)=> {
    req.session!.name = 'name';
    res.render('index', { title: 'Express' });
});

module.exports = router;
