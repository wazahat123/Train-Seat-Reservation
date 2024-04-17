const bcrypt = require('bcrypt');
const pool = require('./connection');
const jwt = require('jsonwebtoken');

const jwtSecret = 'mysecretkey';

async function createAdmin(username, password) {
 
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword)
  


  const query = 'INSERT INTO admin (username, password) VALUES ($1, $2)';
  const values = [username, hashedPassword];
  await pool.query(query, values);
}


async function authenticateAdmin(username, password) {
    console.log(password)
    
    const query = 'SELECT * FROM admin WHERE username = $1';
    const values = [username];
    const result = await pool.query(query, values);
    const admin = result.rows[0];
  
    const passwordMatches = await bcrypt.compare(password, admin.password);
  
    if (passwordMatches) {
    
      const token = jwt.sign({ username: admin.username }, jwtSecret);
      console.log(token)
      return { token };
    } else {
      throw new Error('Incorrect username or password');
    }
  }
  
  // Define a middleware to authenticate admin users
  function requireAdmin(req, res, next) {
    // Retrieve the authorization header
    const authHeader = req.headers.authorization;

  
    if (authHeader) {
      
      const token = authHeader;
  
      
      try {
        const decoded = jwt.verify(token, jwtSecret);
        req.adminUsername = decoded.username;
        next();
      } catch (err) {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  }


  module.exports = {createAdmin, authenticateAdmin, requireAdmin}
  