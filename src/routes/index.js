const ImageController = require("../controllers/image");

const indexRoute = (app) => {
  app.post("/upload/image-product", ImageController.uploadImageProduct)
  app.get("/upload/image-product/:provider_id", ImageController.getImageProduct)

  app.post("/upload/image-user", ImageController.uploadImageUser)
  app.get("/upload/image-user/:user_id", ImageController.getImageUser)

  app.post("/upload/image-restaurant", ImageController.uploadImageRestaurant)
  app.get("/upload/image-restaurant/:provider_id", ImageController.getImageRestaurant)
}


module.exports = indexRoute;