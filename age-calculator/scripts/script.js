var DateTime = luxon.DateTime;

const submitForm = () => {
  console.log('submit');
  calculateAge();
};

const calculateAge = () => {
  const day = document.getElementById('day').value;
  const month = document.getElementById('month').value;
  const year = document.getElementById('year').value;
  const birthDate = DateTime.fromObject({year: year, month: month, day: day});
  const today = DateTime.local();

  const age = today.diff(birthDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

  console.log(age);
  document.querySelector('span.years').innerHTML = age.years;
  document.querySelector('span.months').innerHTML = age.months;
  document.querySelector('span.days').innerHTML = age.days;
};
