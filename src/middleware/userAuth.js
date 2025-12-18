import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    // Token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token missing'
        });
    }

    const token = authHeader.split(' ')[1]; // 'Bearer <token> -> token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id; // userId attaching
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

export default userAuth;
