const { Router } = require("express");
const { images, imagesByUser, uploadImage, uploadProfileImage, uploadGroupImage, removeImage } = require("../handlers/image.handlers");
const { validateId, validateGroupOwner } = require("../middlewares");
const configureUpload = require("../helpers/imageUploader");

const imageRouter = Router();

const generalUpload = configureUpload("src/uploads/");
const profileUpload = configureUpload("src/uploads/profiles/");
const groupUpload = configureUpload("src/uploads/groups/");

imageRouter.get("/", images);
imageRouter.get("/user/:id", validateId, imagesByUser);
imageRouter.post("/upload", generalUpload.single("image"), uploadImage);
imageRouter.post("/profile", profileUpload.single("image"), uploadProfileImage);
imageRouter.post("/group/:groupId", validateGroupOwner, groupUpload.single("image"), uploadGroupImage);
imageRouter.delete("/delete/:imageId", removeImage);

module.exports = imageRouter;
