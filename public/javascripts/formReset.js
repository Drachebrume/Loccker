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
	const captcha = document.getElementById('validationCaptcha');
	if (captcha.value.length > 5) {
		validator(true, captcha.id);
		return true;
	} else {
		validator(false, captcha.id);
		return false;
	}
}

document.getElementById('validationPassword').addEventListener("keyup", event => {
	checkPassword();
});
document.getElementById('validationPasswordConfirm').addEventListener("keyup", event => {
	confirmPassword();
});
document.getElementById('resetForm').addEventListener("submit", event => {
	console.log('ici');
	if (checkPassword() && confirmPassword() && confirmCaptcha()) {
		const form = document.getElementById('resetForm');
		console.log(form);
		form.action = "/auth/resetPassword";
	} else {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
	}
});