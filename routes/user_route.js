import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_data"
import { compare_password, hash_password } from "../services/hash_services"

const user = express.Router()

user.post("/user_register", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.users.create({
            data : {
                email : data.email,
                full_name : data.full_name,
                password : hash_password(data.password),
                // country : parseInt(data.country),
                country_code : parseInt(data.country_code)
            }
        })

        

        res.json({
            success : true,
            msg : "berhasil register",
            query :  result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.post("/user_login", form_data.none(),async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.users.findUnique({
            where : {
                email : data.email
            }
        })

        if(!result){
            res.json({
                success : false,
                msg : "email salah"
            })
            return
        }

        const cek_password = await compare_password(data.password, result.password)

        if(!cek_password){
            res.json({
                success : false,
                msg : "password salah"
            })
            return
        }

        

        res.json({
            success : true,
            msg  : "berhasil login"
        })

    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.get("/user_read_all", async(req,res)=>{
    try {
        const result = await ps.users.findMany({
            include : {
                country :  true,
                merchants :  true,
                orders : true,
                order_item : true,
                
            }
        })

        res.json({
            success : true,
            query :  result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })  
    }
})

user.put("/user_update/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.users.update({
            where : {
                id : parseInt(id)
            },
            data : {
                email : data.email,
                full_name : data.full_name,
                password : hash_password(data.password),
                // country : parseInt(data.country),
                country_code : parseInt(data.country_code)
            }
        })

        res.json({
            success : true,
            msg  : "berhasil update",
            query :  result
        })


    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })  
    }
})

user.delete("/user_delete/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        const result = await ps.users.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil delete",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        }) 
    }
})
export default user