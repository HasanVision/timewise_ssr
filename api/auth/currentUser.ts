
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

// const currentUser = async (req: Request, res: Response) => {
//     if ( req.session && req.session.userId ) {
//         const user = req.session.userId;

//         User.findByPk(user)
//         .then((user) => {
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }
//             res.status(200).json({ isLoggedIn: true, user });
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             res.status(500).json({ message: 'Server error', error });
//         });
//     } else {
//         res.status(200).json({ isLoggedIn: false , message : 'User not logged in'});
//     }
// }
// export default currentUser;

