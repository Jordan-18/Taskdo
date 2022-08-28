import express from "express";
import cors from "cors";
import session  from "express-session";
import UserRoute from "./routers/UserRoute.js";
import AuthRoute from "./routers/AuthRoute.js";
import CompanyRoute from "./routers/CompanyRoute.js";
import ProjectRoute from "./routers/ProjectRoute.js";
import Dotask from "./routers/DoTaskRoute.js";
import Team from "./routers/TeamRoute.js"

const port = 5000;
const app = express();
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({ 
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:false, 
    cookie: { maxAge: oneDay }
}));

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

app.use(UserRoute);
app.use(AuthRoute);
app.use(CompanyRoute);
app.use(ProjectRoute);
app.use(Dotask);
app.use(Team);


app.listen(port, () => console.log(`Server started on port ${port}`));