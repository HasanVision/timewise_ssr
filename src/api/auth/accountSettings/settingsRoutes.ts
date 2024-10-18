import { Router } from 'express';
import { updateName } from './updateName';


const SettingsRoutes = Router();


SettingsRoutes.post('/update-name', updateName);


export default SettingsRoutes;