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
document.getElementById('validationCompany').onchange = function() {
  let company = document.getElementById('validationCompany');
  if (company.value.length > 2) {
    validator(true, "validationCompany");
  } else {
    validator(false, "validationCompany");
  }
}
Checker.mail = function() {
	console.log("test");
	const mail = document.querySelector('#mail');
	if (mail.value.includes("@"))
	{
		let decompo = mail.value.split("@");
		if (decompo[1].includes("."))
		{
		let alpha = decompo[1].split(".");
		return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
};
