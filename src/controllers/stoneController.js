import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import stoneService from "../services/stoneService.js";
import { isAuth } from "../middlewares/userAuthMiddleware.js";

const stoneController = Router(); 

stoneController.get('/create', isAuth, (req, res) => {
    res.render('create', {title: 'Create Page'});
});

stoneController.post('/create', isAuth, async (req, res) => {
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

stoneController.get('/stones/:stoneId/details', async (req, res) => {
    const stoneId = req.params.stoneId;
    // const stoneId = req.params._id;
    const stone = await stoneService.getOne(stoneId).lean();
    const isOwner = stone.owner.toString() === req.user?._id; 
    const hasLiked = stone.likedList?.some(userId => userId.toString() === req.user?._id); 
    res.render('details', {title: 'Details Page', stoneId, stone, isOwner, hasLiked}); 
});

stoneController.get('/stones/:stoneId/like', async (req, res) => {
    // const stoneId = req.params._id;
    const stoneId = req.params.stoneId;
    const userId = req.user?._id;

    if(isStoneOwner(stoneId, userId)) {
        return res.redirect('/404');
    }

    try {
        await stoneService.like(stoneId, userId);
        res.redirect(`/stones/${stoneId}/details`);
    } catch (err) {
        console.log(err);
    }
});

stoneController.get('/stones/:stoneId/delete', isAuth, async (req, res) => {
    if (!isStoneOwner(req.params.stoneId, req.user?._id)) {
        return res.redirect('/404');
    }

    try {
        // await stoneService.remove(req.params._id);
        await stoneService.remove(req.params.stoneId);
        res.redirect('/stones');
    } catch (err) {
        console.log(err);
    }
}); 

stoneController.get('/stones/:stoneId/edit', async (req, res) => {
    // const stone = await stoneService.getOne(req.params._id).lean();
    const stone = await stoneService.getOne(req.params.stoneId).lean();
    res.render('edit', {title: 'Edit Page', stone})
});

stoneController.post('/stones/:stoneId/edit', async (req, res) => {
    const stone = req.body;
    const stoneId = req.params.stoneId;

    try {
        await stoneService.edit(stoneId, stone); 
        res.redirect(`/stones/${stoneId}/details`);
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('edit', {title: 'Edit Page', stone, error});
    }
});

async function isStoneOwner(stoneId, userId) {
    const stone = await stoneService.getOne(stoneId).lean();
    const isOwner = stone.owner.toString() === userId;

    return isOwner;
}

export default stoneController;