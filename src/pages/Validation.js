export const validation = (values) => {
  const errors = {
    
  }

  const results = {

  }

  const user_pattern = /^[A-z][A-z0-9-_]{3,23}$/;
  const pwd_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  if(values.username === ""){
    errors.username = "Name is required";
  }else if(!user_pattern.test(values.username)){
    errors.username = "4 to 24 characters.Must begin with a letter.Letters, numbers, underscores, hyphens allowed.";
    results.username = false;
  }else if(user_pattern.test(values.username)){
    errors.username = "";
    results.username = true;
  }

  if(values.password === ""){
    errors.password = "Password is required";
  }else if(!pwd_pattern.test(values.password)){
    errors.password = "Must include uppercase and lowercase letter and a special character";
  }


  return ({errors, results})
} 

