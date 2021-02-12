let validFields = [0, 0, 0, 0];
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
function checkUsername () {
	const name = document.getElementById('validationUsername');
	const refused = /['`";]/;
  if (name.value.length > 2 && !(refused.test(name.value))) {
		validator(true, name.id);
		return true;
  } else {
		validator(false, name.id);
		return false
  }
}
function checkMail () {
	const mail = document.getElementById('validationMail');
	const refused = /['`";]/;
	if (mail.value.includes("@") && !(refused.test(mail.value))) {
		if ((mail.value.split("@"))[1].includes(".")) {
			validator(true, mail.id);
			return true;
		} else {
			validator(false, mail.id);
			return false;
		}
	} else {
		validator(false, mail.id);
		return false;
	}
}
function checkPassword () {
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
			return true;
		} else {
			validator(false, password.id);
			return false;
		}
}
function confirmPassword () {
	const password1 = document.getElementById('validationPassword');
	const password2 = document.getElementById('validationPasswordConfirm');
	if (password1.value === password2.value) {
		validator(true, password2.id);
		return true;
	} else {
		validator(false, password2.id);
		return false;
	}
}
function confirmCaptcha () {
	const captcha = document.getElementById('validationCatcha');
	console.log(captcha);
	console.log(captcha.value);
	if (captcha.value.length > 5) {
		validator(true, captcha.id);
		return true;
	} else {
		validator(false, captcha.id);
		return false;
	}
}
document.getElementById('validationUsername').addEventListener("keyup", event => {
	checkUsername();
});
document.getElementById('validationMail').addEventListener("keyup", event => {
	checkMail();
});
document.getElementById('validationPassword').addEventListener("keyup", event => {
	checkPassword();
});
document.getElementById('validationPasswordConfirm').addEventListener("keyup", event => {
	confirmPassword();
})
document.getElementById('signupForm').addEventListener("submit", event => {
	if (checkUsername() && checkMail() && checkPassword() && confirmPassword() && confirmCaptcha()) {
		const form = document.getElementById('signupForm');
		form.action = "/signup"
	} else {
		event.preventDefault();
  	event.stopPropagation();
  	event.stopImmediatePropagation();
	}
})