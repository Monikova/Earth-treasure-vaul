import { Router } from "express";
import stoneService from "../services/stoneService.js";

const router = Router();

router.get('/', async (req, res) => {
    const last3Stones = await stoneService.getAll().limit(3).lean().sort({$natural:-1}); 
    res.render('home', {title: 'Home Page', last3Stones});
    // res.render('home', {title: 'Home Page'}); // to simulate no stones to show
}); 

export default router; 