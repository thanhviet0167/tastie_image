const multer = require('multer')
const fs = require('fs')
const ImageProductModel = require('../models/image');
const image_user = require('../models/image_user');
const image_restaurant = require('../models/image_restaurant');
const btoa = require('btoa');
const host = require('../../config/connectMySQL')


const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const uploadImg = multer({
    storage : Storage
}).single('image')


class ImageController{

    static uploadImageUserSpaces = async (req, res) => {
        try {

           await host.execute(`UPDATE Tastie.User SET avatar='${req.file.location}' WHERE user_id=${req.body.user_id}`);
            res.json({
                status : true,
                message : "upload success",
                url : req.file.location
            })
        } catch (error) {
            console.log(error)
            res.json({
                status : false,
                message : "upload fail"
            })
        }

    }

    static uploadFileImage = (req, res) => {
        try {

            
            res.json({
                status : true,
                message : "upload success",
                url : req.file.location
            })
        } catch (error) {
            console.log(error)
            res.json({
                status : false,
                message : "upload fail"
            })
        }
       
    }


    static uploadImageProduct =  (req, res) => {
        
        
        uploadImg(req, res, (err) => {
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
            var response = []
            for(var i = 0; i < list_image.length; i++){
  
                const data = btoa(list_image[i].image.data);
                var objData = {
                    url_str : data,
                    provider_id : list_image[i]['provider_id'],
                    product_name : list_image[i]['product_name']
                }
                response.push(objData);
          
                
               
            }

            res.json({
                status : true,
                response
            })
        } catch (error) {
            console.log(error)
            res.json({
                status : false,
                response : []
            })
        }
    }


    // User

    static uploadImageUser = (req, res) => {
        uploadImg(req, res, (err) => {
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
            var response = []
            for(var i = 0; i < image_info.length; i++){
  
                const data = btoa(image_info[i].image.data);
                var objData = {
                    url_str : data,
                    user_id : image_info[i]['user_id'],
                    image_name : image_info[i]['image_name']
                }
                response.push(objData);
          
                
               
            }
            res.json({
                status : true,
                response
            })
        } catch (error) {
            res.json({
                status : false,
                response : []
            })
        }
    }

    // Restaurant

    static uploadImageRestaurant = (req, res) => {
        uploadImg(req, res, (err) => {
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
            console.log(image_info.length)

            var response = []
            for(var i = 0; i < image_info.length; i++){
  
                const data = btoa(image_info[i].image.data);
                var objData = {
                    url_str : data,
                    provider_id : image_info[i]['provider_id'],
                    image_name : image_info[i]['image_name']
                }
                response.push(objData);
          
                
               
            }
            res.json({
                status : true,
                response
            })
        } catch (error) {
            console.log(error)
            res.json({
                status : false,
                response : []
            })
        }
    }
    
}

module.exports = ImageController