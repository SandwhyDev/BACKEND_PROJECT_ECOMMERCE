import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_data"

const country_code = express.Router()

country_code.post("/country_code_create", form_data.none(),async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.countries.create({
            data : {
                code : parseInt(data.code),
                kecamatan : data.kecamatan,
                kelurahan : data.kelurahan,
                kota : data.kota
            }
        })

        res.json({
            success : true,
            msg : "success country code",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

country_code.get("/country_code_read_all", async (req,res)=>{
    try {
        const result = await ps.countries.findMany()
        res.json({
            success : true,
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

country_code.put("/country_code_update/:code",form_data.none() ,async(req,res)=>{
    try {
        const {code} = await req.params
        const data = await req.body
        const result = await ps.countries.update({
            where : {
                code : await parseInt(code)
            },
            data : {
                code : parseInt(data.code),
                kecamatan : data.kecamatan,
                kelurahan : data.kelurahan,
                kota : data.kota
            }
        })

        res.json({
            success : true,
            msg : "berhasil update",
            query : result
        })
        
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

export default country_code