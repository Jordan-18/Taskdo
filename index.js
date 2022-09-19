import express from "express";
import cors from "cors";
import session  from "express-session"
import dotenv from "dotenv";
import UserRoute from "./routers/UserRoute.js";
import AuthRoute from "./routers/AuthRoute.js";
import CompanyRoute from "./routers/CompanyRoute.js";
import ProjectRoute from "./routers/ProjectRoute.js";
import Dotask from "./routers/DoTaskRoute.js";
import Team from "./routers/TeamRoute.js";
import listEndpoints from "express-list-endpoints";
import db from "./config/Database.js";
import conn from "./config/Mysql.js";
dotenv.config();

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
// app.use(Main);

app.get('/', async (req, res) => {
    try {
        await db.authenticate();
        if(conn.connect(function(err) {
            if (err) {
                return res.status(500).json({ status:500, msg:'error: ' + err.message});
            }else{
                res.status(200).json({
                    status: 200,
                    mysql: 'Connected to the MySQL Successfully.',
                    sequelize: "Sequelize Connection Successfully",
                    route:listEndpoints(app)
                });
            }
        }));
    } catch (error) {
        res.status(500).json({status:500, msg:error, error: data});
    }
})

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));