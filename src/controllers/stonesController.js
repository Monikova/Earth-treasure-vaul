import { Router } from "express";

const stonesController = Router(); 

stonesController.get('/create', (req, res) => {
    res.render("create", {title: 'Create Page'});
});

export default stonesController;