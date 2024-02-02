const cardName = document.getElementById('name');
const cardNumber = document.getElementById('number');
const cardEXP = document.getElementById('exp');
const cardCVC = document.getElementById('cvc');

const nameInput = document.getElementById('card-holder');
const numberInput = document.getElementById('card-number');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const cvcInput = document.getElementById('card-cvc');
const submitButton = document.getElementById('submit');

var nameMask = IMask(nameInput, {
  mask: /^[a-zA-Z\s]{0,26}$/
});

var cardNumberMask = IMask.createMask({
  mask: '0000 0000 0000 0000',
  lazy: false,
  overwrite: true,
  placeholderChar: '0'
});

var expMask = IMask.createMask({
  mask: '00/00',
  lazy: false,
  overwrite: true,
  placeholderChar: '0'
});

var cardMask = IMask(numberInput, {
  mask: '0000 0000 0000 0000'
});

var monthMask = IMask(monthInput, {
  mask: IMask.MaskedRange,
  from: 1,
  to: 12,
  maxLength: 2,
  lazy: true,
  overwrite: true,
  placeholderChar: '0',
  autofix: 'pad',
});

var yearMask = IMask(yearInput, {
  mask: IMask.MaskedRange,
  from: 23,
  to: 50,
  maxLength: 2,
  lazy: true,
  placeholderChar: '0',
  autofix: 'pad',
  overwrite: true,
});

var cvcMask = IMask(cvcInput, {
  mask: '000',
  lazy: true,
  placeholderChar: '0',
  overwrite: true,
});

monthInput.addEventListener('focus', () => { monthMask.updateOptions({ lazy: false }); }, true);
monthInput.addEventListener('blur', () => { monthMask.updateOptions({ lazy: true }); }, true);

yearInput.addEventListener('focus', () => { yearMask.updateOptions({ lazy: false }); }, true);
yearInput.addEventListener('blur', () => { yearMask.updateOptions({ lazy: true }); }, true);

cvcInput.addEventListener('focus', () => { cvcMask.updateOptions({ lazy: false }); }, true);
cvcInput.addEventListener('blur', () => { cvcMask.updateOptions({ lazy: true }); }, true);

// cardMask.on("complete", () => { monthInput.focus(); });
// monthMask.on("complete", () => { yearInput.focus(); });
// yearMask.on("complete", () => { cvcInput.focus(); });
// cvcMask.on("complete", () => { submitButton.focus(); });

nameMask.on("accept", () => {
  cardName.innerHTML = (nameMask.value || "JANE APPLESEED").toUpperCase();
});

cardMask.on("accept", () => {
  cardNumberMask.resolve(cardMask.unmaskedValue);
  cardNumber.innerHTML = cardNumberMask.value;
});

monthMask.on("accept", () => {
  expMask.resolve(monthMask.value + yearMask.value);
  cardEXP.innerHTML = expMask.value;
});

yearMask.on("accept", () => {
  expMask.resolve((monthMask.value || "00") + yearMask.value);
  cardEXP.innerHTML = expMask.value;
});

cvcMask.on("accept", () => {
  cardCVC.innerHTML = cvcMask.value || "000";
})

window.addEventListener("load", () => {
  cardName.innerHTML = (nameMask.value || "JANE APPLESEED").toUpperCase();
  cardNumberMask.resolve(cardMask.unmaskedValue);
  cardNumber.innerHTML = cardNumberMask.value;
  expMask.resolve((monthMask.value || "00") + yearMask.value);
  cardEXP.innerHTML = expMask.value;
  cardCVC.innerHTML = cvcMask.value || "000";
});


// Failed attempt to show validation errors
// var masks = [cvcMask, yearMask, monthMask];

// const validateControl = (control) => {
//   const connectedValidationId = control.getAttribute('aria-describedby');
//   const connectedValidation = connectedValidationId ? document.getElementById(connectedValidationId) : false;

//   if (connectedValidation && control.validity.valueMissing) {
//     connectedValidation.innerText = "Can't be blank";
//     control.style.borderColor = 'hsl(0, 100%, 50%)';
//   } else {
//     connectedValidation.innerHTML = '&nbsp;';
//   }
// };

// document.addEventListener('blur', function (event) {
//   // Validate the field
//   masks.forEach(m => { m.updateOptions({ lazy: true }); });
//   validateControl(event.target);
// }, true);

// submitButton.onclick = (e) => {
//   console.log('submit');
//   [...document.getElementsByTagName('input')].forEach(i => { validateControl(i); });
// };


const thankYou = () => {
  document.getElementsByClassName('card-form')[0].style.display = 'none';
  document.getElementById('thank-you').style.display = 'flex';
}
