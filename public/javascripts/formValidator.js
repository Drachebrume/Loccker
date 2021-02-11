function validator(valid, inputId) {
  let field = document.getElementById(inputId);
  if (valid) {
    field.classList.remove('is-invalid')
    field.classList.add('is-valid')
  } else {
    field.classList.remove('is-valid')
    field.classList.add('is-invalid')
  }
}
document.getElementById('validationUsername').addEventListener("keyup", event => {
	const name = document.getElementById('validationUsername');
	const refused = /['`";]/;
  if (name.value.length > 2 && !(refused.test(name.value))) {
    validator(true, name.id);
  } else {
    validator(false, name.id);
  }
});
document.getElementById('validationMail').addEventListener("keyup", event => {
	const mail = document.getElementById('validationMail');
	const refused = /['`";]/;
	if (mail.value.includes("@") && !(refused.test(mail.value))) {
		if ((mail.value.split("@"))[1].includes(".")) {
			validator(true, mail.id);
		} else {
			validator(false, mail.id);
		}
	} else {
		validator(false, mail.id);
	}
});
document.getElementById('validationPassword').addEventListener("keyup", event => {
	const password = document.getElementById('validationPassword');
	const format = /[ !@#$%^&*()_+\-=\[\]{}:\\|,.<>\/?~]/;
	const refused = /['`";]/;
	const numbers = /[1234567890]/
	if (password.value.length > 7 
		&& !(refused.test(password.value))
		&& (/[A-Z]/.test(password.value))
		&& numbers.test(password.value)
		&& format.test(password.value)) {
			validator(true, password.id);
		} else {
			validator(false, password.id);
		}
});
document.getElementById('validationPasswordConfirm').addEventListener("keyup", event => {
	const password1 = document.getElementById('validationPassword');
	const password2 = document.getElementById('validationPasswordConfirm');
	if (password1.value === password2.value) {
		validator(true, password2.id);
	} else {
		validator(false, password2.id);
	}
})
document.getElementById('signupForm').addEventListener("submit", event => {
	const form = document.getElementById('signupForm');
	form.action = "/signup"
})