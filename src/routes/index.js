const {upload} = require('../../config/multer');
const ImageController = require("../controllers/image");

const indexRoute = (app) => {
  app.post("/upload/image-product", ImageController.uploadImageProduct)
  app.get("/upload/image-product/:provider_id", ImageController.getImageProduct)

  app.post("/upload/image-user", ImageController.uploadImageUser)
  app.get("/upload/image-user/:user_id", ImageController.getImageUser)

  app.post("/upload/image-restaurant", ImageController.uploadImageRestaurant)
  app.get("/upload/image-restaurant/:provider_id", ImageController.getImageRestaurant)

  app.post("/upload", upload, ImageController.uploadFileImage)
  app.post("/upload/user/avatar", upload, ImageController.uploadImageUserSpaces)
  app.post("/upload/provider/avatar", upload, ImageController.uploadImageProviderSpaces)

  // delete
  app.post("/delete/user/avatar", ImageController.deleteImgUser)
  app.post("/delete/provider/avatar", ImageController.deleteImgProvider)
  app.post("/delete/product/avatar", ImageController.deleteImgProduct)
}

// https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC81OTM5M2NhNy1iNWZhLTQxYzEtYjIxMS00ZDJlNzRiZDcwYTYuanBlZw==


module.exports = indexRoute;