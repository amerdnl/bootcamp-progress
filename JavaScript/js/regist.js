function sendit() {
  const expIdText = /^[A-Za-z0-9]{4,20}$/;

  // ^ this is the beginning.
  // (?=.*) this means there should be at least 1 pattern you want somewhere.
  // (?=.*[A-Za-z]) this means there must be at least 1 character.
  // (?=.*\d) this means there must be at least 1 number.
  // (?=.*[!@#$%^&*]) this means there must be at least 1 special character.
  // [A-Za-z\d!@#$%^&*]{8,20} this means to find a string that is combination of letters, numbers, and special characters with a length of 8 to 20.

  const expPwText =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  const expNameText = /^[A-Za-z]+$/;

  const expHpText = /^\d{3}-\d{3,4}-\d{3,4}/;

  const expEmailText = /^[A-Za-z0-9\-\.]+@[A-Za-z0-9\-]+\.[A-Za-z]+$/;

  const userid = document.getElementById("userid");
  const userpw = document.getElementById("userpw");
  const userpw_re = document.getElementById("userpw_re");
  const name = document.getElementById("name");
  const hp = document.getElementById("hp");
  const email = document.getElementById("email");

  if (userid.value === "") {
    alert("Enter the User ID");
    userid.focus();
    return false;
  }

  if (!expIdText.test(userid.value)) {
    alert(
      "User ID must be between 4 and 20 characters long, consisting of letters and numbers",
    );
    userid.focus();
    return false;
  }

  if (!expPwText.test(userpw.value)) {
    alert(
      "Password must must include at least 1 letter, 1 number and 1 special character and must be between 8 and 20 characters long.",
    );
    userpw.focus();
    return false;
  }

  if (userpw.value != userpw_re.value) {
    alert("The password confirmation didn't match the password.");
    userpw_re.focus;
    return false;
  }

  if (!expNameText.test(name.value)) {
    alert("Please enter your name in English.");
    name.focus();
    return false;
  }

  if (!expHpText.test(hp.value)) {
    alert("Mobile phone number format does not match.");
    hp.focus();
    return false;
  }

  if (!expEmailText.test(email.value)) {
    alert("email format is incorrect.");
    email.focus();
    return false;
  }
  return true;
}
