import { Router } from 'express';
import { updateName } from './updateName';
import { UpdatePrimaryEmailApi } from './updatePrimaryEmail';
import { UpdateSecondaryEmailApi } from './updateSecondaryEmail';


const SettingsRoutes = Router();


SettingsRoutes.post('/update-name', updateName);
SettingsRoutes.post('/update-primary-email', UpdatePrimaryEmailApi);
SettingsRoutes.post('/update-secondary-email', UpdateSecondaryEmailApi)


export default SettingsRoutes;