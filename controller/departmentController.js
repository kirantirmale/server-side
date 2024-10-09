    const fs = require("fs");
    const department = require('../models/department');
    const user = require('../models/user');


    exports.getdata = async (req, res) => {
        try {
            const userData = await user.find()
            const depData = await department.find()

            // console.log("depData",depData)
            // console.log("userData",userData)
            const page = parseInt(req.query.page) || 1;  
            const limit = parseInt(req.query.limit) || 5;  

            const skip = (page - 1) * limit;

            const totalItems = await department.countDocuments();

            const data = await department.find()
                .skip(skip)
                .limit(limit);

        
            const totalPages = Math.ceil(totalItems / limit);

            return res.status(200).json({
                data: data,
                userData :userData,
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };


    exports.adddata = async (req, res) => {
        try { 
            let data = await department.create(req.body)
            console.log(data)
            return res.status(200).json(data)
        } catch (error) {
            return res.status(200).json({message: error.message})
        }
    }

    exports.getonedata = async (req, res) => {
        try {
            let data = await department.findOne({_id:req.query.id})
            return res.status(200).json(data)
        } catch (error) {
            return res.status(200).json({message: error.message})
        }
    }
    exports.updatedata = async (req, res) => {
        try {
            let data = await department.updateOne({_id:req.query.id},{$set:req.body})
            return res.status(200).json(data)
        } catch (error) {
            return res.status(200).json({message: error.message})
        }
    }
    exports.deletedata = async (req, res) => {
        try {
                let data = await department.deleteOne({_id:req.query.id})
            return res.status(200).json(data)
        } catch (error) {
            return res.status(200).json({message: error.message})
        }
    }

  
    