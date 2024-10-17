
import { Request, Response } from 'express';
import { User } from '../../models/User';


const currentUser = async (req: Request, res: Response) => {
    console.log('currentUser middleware hit');
    if ( req.session && req.session.userId ) {
        const user = await User.findOne({ where: { id: req.session.userId } });
        res.status(200).json({ isLoggedIn: true, user });   

    } else {
        res.status(200).json({ isLoggedIn: false });
    }
}

export default currentUser;
