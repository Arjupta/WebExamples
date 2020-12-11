const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkauth = require('../middleware/check-auth');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        const d = new Date();
        const name = d.toISOString().replace(/:/g, '-')+ '_' + file.originalname ;
        cb(null, name);
    }
});
const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ||file.mimetype === 'image/png')
        cb(null,true);
    else
        cb(null,false);
}
const upload = multer({
    storage:storage,
    limits: {fileSize:1024*1024*5},
    fileFilter: fileFilter
});
const ProductsController = require('../controllers/products');

router.get('/', ProductsController.products_get_all_products);

router.post('/', checkauth, upload.single('productImage') , ProductsController.products_create_product);

router.get('/:productId', ProductsController.get_product_by_id);

router.patch('/:productId',checkauth , ProductsController.update_product);

router.delete('/:productId',checkauth , ProductsController.delete_product);

module.exports = router;