import express, { Router } from 'express';
import { upload } from '../config/multer';
import * as userController from '../controllers/userController'
import * as adminController from '../controllers/adminController';


const router: Router = express.Router();

//User Routes//

router.post('/register', userController.createUser);
router.post('/login', userController.verifyUser);
router.get('/profile',userController.fetchUser);
router.post('/image',upload.single('image'),userController.imageUpload);
router.delete('/imageDelete',userController.imageDelete);


//Admin Routes//

router.post('/adminlogin',adminController.verifyAdmin);
router.get('/fetchUsers',adminController.fetchAllUsers);
router.post('/create',adminController.newUser);
router.patch('/update',adminController.updateUser);
router.delete('/deleteUser',adminController.deleteUser)


export default router;