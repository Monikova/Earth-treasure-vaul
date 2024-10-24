import express from 'express';
import 'dotenv/config';
import router from './routes.js';
import handlebarsInit from './config/handlebarsInit.js';
import mongooseInit from './config/mongooseInit.js';
import cookieParser from 'cookie-parser';
import { userAuthMiddleware } from './middlewares/userAuthMiddleware.js';

mongooseInit();

const app = express();
mongooseInit();
handlebarsInit(app);

const PORT = process.env.PORT;

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(userAuthMiddleware);
app.use(router);

app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));