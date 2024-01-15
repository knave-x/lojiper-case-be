function isValidEmail(email) {
  return email.includes("@");
}

function isValidPassword(password) {
  return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password);
}

module.exports = {
  isValidEmail,

  isValidPassword,
};
