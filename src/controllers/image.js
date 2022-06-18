const multer = require('multer')
const fs = require('fs')
const ImageProductModel = require('../models/image');
const image_user = require('../models/image_user');
const image_restaurant = require('../models/image_restaurant');

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({
    storage : Storage
}).single('image')


class ImageController{
    static uploadImageProduct =  (req, res) => {
        
        
        upload(req, res, (err) => {
            if(err)
            {
                console.log(err)
                res.json({
                    status : false,
                    message : "upload fail"
                })

            }
            
            else{
                console.log(file.filename)
                const newImageProduct = new ImageProductModel({
                    provider_id : parseInt(req.body.provider_id),
                    product_name : req.body.product_name,
                    image : {
                        data : fs.readFileSync('uploads/'+ req.file.filename),
                        contentType: 'image/png'
                    }
                })

                newImageProduct.save().then(()=> {
                    res.json({
                        status : true,
                        message : "upload success"
                    })
                }).catch(err => {console.log(err)})
            }
        })
    }

    static getImageProduct = async (req, res) => {
        try {
            const provider_id = req.params.provider_id
            const list_image = await ImageProductModel.find({provider_id : parseInt(provider_id)}).exec();
            console.log(list_image.length)
            res.json({
                status : true,
                list_image : list_image
            })
        } catch (error) {
            res.json({
                status : false,
                list_image : []
            })
        }
    }


    // User

    static uploadImageUser = (req, res) => {
        upload(req, res, (err) => {
            if(err)
            {
                console.log(err)
                res.json({
                    status : false,
                    message : "upload fail"
                })

            }
            
            else{
                const newImageProduct = new image_user({
                    user_id : parseInt(req.body.user_id),
                    image_name : req.body.image_name,
                    image : {
                        data : fs.readFileSync('uploads/'+ req.file.filename),
                        contentType: 'image/png'
                    }
                })

                newImageProduct.save().then(()=> {
                    res.json({
                        status : true,
                        message : "upload success"
                    })
                }).catch(err => {console.log(err)})
            }
        })
    }

    static getImageUser = async (req, res) => {
        try {
            const user_id = req.params.user_id
            const image_info = await image_user.find({user_id : parseInt(user_id)}).exec();
            console.log(image_info.length)
            res.json({
                status : true,
                image_info : image_info[image_info.length-1]
            })
        } catch (error) {
            res.json({
                status : false,
                image_info : {}
            })
        }
    }

    // Restaurant

    static uploadImageRestaurant = (req, res) => {
        upload(req, res, (err) => {
            if(err)
            {
                console.log(err)
                res.json({
                    status : false,
                    message : "upload fail"
                })

            }
            
            else{
                const newImageProduct = new image_restaurant({
                    provider_id : parseInt(req.body.provider_id),
                    image_name : req.body.image_name,
                    image : {
                        data : fs.readFileSync('uploads/'+ req.file.filename),
                        contentType: 'image/png'
                    }
                })

                newImageProduct.save().then(()=> {
                    res.json({
                        status : true,
                        message : "upload success"
                    })
                }).catch(err => {console.log(err)})
            }
        })
    }

    static getImageRestaurant = async (req, res) => {
        try {
            const provider_id = req.params.provider_id
            const image_info = await image_restaurant.find({provider_id : parseInt(provider_id)}).exec();
            console.log(image_info)
            res.json({
                status : true,
                image_info
            })
        } catch (error) {
            console.log(error)
            res.json({
                status : false,
                image_info : {}
            })
        }
    }
    
}

module.exports = ImageController