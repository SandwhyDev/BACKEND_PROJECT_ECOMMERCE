import express from "express"
import cors from "cors"
import env from "dotenv"
import country_code from "./routes/country_route"
import user from "./routes/user_route"
import { merchants } from "./routes/mechants_route"
import { products } from "./routes/product_route"
import { categori } from "./routes/categori_route"
import { orders } from "./routes/orders_route"
import { order_item } from "./routes/orders_item_route"
import { merchants_periods } from "./routes/merchants_periods"
env.config()

const app = express()
const {PORT} = process.env

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//route
app.use("/api", user)
app.use("/api", country_code)
app.use("/api", merchants)
app.use("/api", products)
app.use("/api", categori)
app.use("/api", orders)
app.use("/api", order_item)
app.use("/api", merchants_periods)


//listener
app.listen(PORT,()=>{
    console.log(`listened to port ${PORT}`);
})