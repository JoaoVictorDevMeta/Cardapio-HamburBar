import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;

    if(!token) return res.status(401).json( 'Acesso Negado' );

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json("Token não está valido");
        req.user = user;
        next();
    })
}