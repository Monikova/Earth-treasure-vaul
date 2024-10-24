import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import stoneService from "../services/stoneService.js";

const stoneController = Router(); 

stoneController.get('/create', (req, res) => {
    res.render('create', {title: 'Create Page'});
});

stoneController.post('/create', async (req, res) => {
    const stone = req.body; 
    console.log(stone);
    const userId = req.user._id;

    try {
        await stoneService.create(stone, userId);
        res.redirect('/stones');
    } catch (err) {
        const error = getErrorMessage(err); 
        res.render('create', {title: 'Create Page', stone, error});
    }
});

stoneController.get('/stones', async (req, res) => {
    const stones = await stoneService.getAll().lean();
    res.render('dashboard', {title: 'Dashboard Page', stones});
    // res.render('dashboard', {title: 'Dashboard Page'}); // to simulate no stones;
});

export default stoneController;