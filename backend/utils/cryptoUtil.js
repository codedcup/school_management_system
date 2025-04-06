const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.HASH_SECRET;
const SALT_ROUNDS = 10;

/**
 * Hash password with added secret key salt
 */
const hashPassword = async (plainPassword) => {
    const saltedPassword = plainPassword + SECRET_KEY;
    const hash = await bcrypt.hash(saltedPassword, SALT_ROUNDS);
    return hash;
};

/**
 * Compare plain password with hash
 */
const comparePassword = async (plainPassword, hashedPassword) => {
    const saltedPassword = plainPassword + SECRET_KEY;
    const match = await bcrypt.compare(saltedPassword, hashedPassword);
    return match;
};

module.exports = {
    hashPassword,
    comparePassword
};