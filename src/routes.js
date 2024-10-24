import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";
import stoneController from "./controllers/stoneController.js";

const router = Router(); 

router.use(homeController);
router.use(userController); 
router.use(stoneController);

router.all('*', (req, res) => {
    res.render('404', {title: '404 Page'});
})

export default router; 