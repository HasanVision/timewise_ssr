import { Router } from 'express';
import { updateName } from './updateName';
import { UpdatePrimaryEmailApi } from './updatePrimaryEmail';
import { UpdateSecondaryEmailApi } from './updateSecondaryEmail';
import {verifySecondaryEmailToken} from './verifySecondaryEmailToken'
import {verifyPrimaryEmailUpdateToken} from './verifyPrimaryEmailUpdateToken'


const SettingsRoutes = Router();


SettingsRoutes.post('/update-name', updateName);
SettingsRoutes.post('/update-primary-email', UpdatePrimaryEmailApi);
SettingsRoutes.post('/update-secondary-email', UpdateSecondaryEmailApi)
SettingsRoutes.post('/verify-secondary-email', verifySecondaryEmailToken)
SettingsRoutes.post('/verify-otp-primary-email-update', verifyPrimaryEmailUpdateToken)


export default SettingsRoutes;