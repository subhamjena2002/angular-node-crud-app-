const express = require("express");
const connection = require("./connection");
const router = express.Router();
const { validatorSignup } = require("./validationMiddlewire");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secretKey = crypto.randomBytes(32).toString("hex");
console.log(secretKey);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === requiredRole) {
      next(); 
    } else {
      res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    }
  };
};
const requireAdmin = verifyRole("admin");
const requireUser = verifyRole("user");




//get All Users
router.get("/api/getUserData", authenticateToken,requireAdmin, (req, res) => {
  connection.query("SELECT * FROM userdata", (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Error executing query" });
    }
    res.status(200).json(results);
  });
});

//Create User
router.post("/api/postUserData", validatorSignup, (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const phoneno = req.body.phoneno;
  connection.query(
    "INSERT INTO userdata (name, password,email,phoneno) VALUES (?,?,?,?)",
    [name, password, email, phoneno],
    (err, result) => {
      if (err) {
        res.status(500).send("Error inserting data");
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    }
  );
});

// Delete User
router.delete("/api/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  connection.query(
    "DELETE FROM userdata WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error deleting user");
        console.error("Error executing query: " + err.stack);
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    }
  );
});

// get Single User
router.get("/api/getUserData/:userId",requireAdmin, (req, res) => {
  const userId = parseInt(req.params.userId);
  connection.query(
    "SELECT * FROM userdata WHERE id = ?",
    [userId],
    (err, result) => {
      console.log(result);
      if (err) {
        res.status(500).send("Error Getting user");
        console.error("Error executing query: " + err.stack);
      } else {
        if (result.length > 0) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    }
  );
});

// update User
router.put("/api/updateUserData/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const phoneno = req.body.phoneno;
  connection.query(
    "UPDATE userdata SET name= ? ,email = ? , password = ? , phoneno = ? WHERE id = ?",
    [name, email, password, phoneno, userId],
    (err, result) => {
      console.log(result);
      if (err) {
        res.status(500).send("Error Getting user");
        console.error("Error executing query: " + err.stack);
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    }
  );
});

// login
// router.post("/api/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   connection.query(
//     // `SELECT * FROM userdata union roles WHERE email = '${email}' AND password = '${password}'`,
//     `SELECT userdata.*, roles.name
//      FROM userdata
//      JOIN roles ON userdata.role_id = roles.id where userdata.email = '${email}' AND userdata.password = '${password}'`,
//      [(email, password)],
//     (err, result) => {
//       console.log(result[0]);
//       if (err) {
//         res.status(500).json("Internal Server Error");
//       } else {
//         if (result.length === 0) {
//           res.status(401).json("Invalid Username or Password");
//         } else {
//           const token = jwt.sign(
//             { email: result[0].email, id: result[0].id ,role: result[0].name},
//             secretKey,
//             { expiresIn: "5h" }
//           );
//           res.status(200).json({ token: token, code: 200 ,data:result});
//         }
//       }
//     }
//   );
// });


router.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  // Fetch user data including the role from the database
  connection.query(
    `SELECT userdata.*, roles.name AS role_name
     FROM userdata
     JOIN roles ON userdata.role_id = roles.id 
     WHERE userdata.email = ? AND userdata.password = ?`,
     [email, password],
    (err, result) => {
      if (err) {
        console.error("Error fetching user data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Check if user with provided credentials exists
      if (result.length === 0) {
        return res.status(401).json({ error: "Invalid Username or Password" });
      }

      const userData = result[0];
      const { id, email, role_name } = userData;

     
      const token = jwt.sign(
        { id, email, role: role_name },
        secretKey,
        { expiresIn: "5h" }
      );

      res.status(200).json({ token, code: 200, data: userData });
    }
  );
});

module.exports = router;
