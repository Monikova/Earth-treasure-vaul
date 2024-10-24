import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";
import stonesController from "./controllers/stonesController.js";

const router = Router(); 

router.use(homeController);
router.use(userController); 
router.use(stonesController);

router.all('*', (req, res) => {
    res.render('404', {title: '404 Page'});
})

export default router; 