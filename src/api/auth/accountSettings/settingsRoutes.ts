import { Router } from 'express';
import { updateName } from './updateName';
import { UpdatePrimaryEmailApi } from './updatePrimaryEmail';


const SettingsRoutes = Router();


SettingsRoutes.post('/update-name', updateName);
SettingsRoutes.post('/update-primary-email', UpdatePrimaryEmailApi);


export default SettingsRoutes;