const bcrypt = require('bcrypt');

async function runTest() {
  const password = "mysecretpassword123!";
  
  // Register flow
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Login flow
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log("Is Match (Exact):", isMatch);
  
  const isMatchWrong = await bcrypt.compare("mysecretpassword123", hashedPassword);
  console.log("Is Match (Wrong):", isMatchWrong);
}

runTest();
