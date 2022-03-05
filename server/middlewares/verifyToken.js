import jwt from 'jsonwebtoken';

class privateRoute {
    static authUser = (req, res, next) => {
        // const token =  req.body.token || req.query.token || req.headers["x-access-token"];
        const token = req.header('auth-token');
        if (!token) {
            return res.status(403).send("A token is required for authentication");
          }
    
        try {
            
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified.user;
    
            next();
    
        } catch (error) {
            // res.status(400).json({message:'Invalid Token'});
        }
    
    }
}

export default privateRoute;