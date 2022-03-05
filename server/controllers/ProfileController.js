import Profile from '../models/UsersModel.js';
import jwt from 'jsonwebtoken';

class MyProfile {
    static me = async(req, res) => {
        const token = req.header('auth-token');
        // if(!token) return res.status(401).send('Access Denied');

        try {
            
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified.user;

            // if(req.user.role == 'admin'){
            //     res.status(401).send('Access Denied You are an Admin');
            // }

            let profile = await Profile.findById(req.user.id)

            if(!profile){
                return res.status(404).json({
                    message : "No profile found",
                });
            }

            return res.status(200).json({
                username : profile.username,
                USD : profile.USD,
                EUR : profile.EUR,
                NGN : profile.NGN
            });
    
        } catch (error) {
            return res.status(404).json({
                message : "Unable to get profile",
            });
        }
    }
}

export default MyProfile;