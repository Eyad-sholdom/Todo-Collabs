// validationUtils.js or validationUtils.ts

export const validateInput = (formData) => {
  const errors = {};

  // First Name Validation
  const firstNameRegex = /^[a-zA-Z]{3,}$/;
  if (!firstNameRegex.test(formData.first_name)) {
    errors.first_name =
      "First name must be at least 3 letters with no special characters or numbers.";
  }

  // Last Name Validation
  const lastNameRegex = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
  if (!lastNameRegex.test(formData.last_name)) {
    errors.last_name =
      "Last name must be at least 3 letters with only one space allowed.";
  }

  // Password Validation
  const passwordRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*-]).{8,20}$/;
  if (!passwordRegex.test(formData.password)) {
    console.log(formData.password);

    errors.password =
      "Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 special character, and numbers.";
  }

  // Email Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format.";
  }

  return errors;
};
