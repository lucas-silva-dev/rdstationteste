import { tns } from '../../../../node_modules/tiny-slider/src/tiny-slider';

const phoneMask = (tel) => {
  tel = tel.replace(/\D/g, '');
  tel = tel.replace(/(.{0})(\d)/, '$1($2');
  tel = tel.replace(/(.{3})(\d)/, '$1)$2');
  tel = tel.replace(/(.{4})(\d)/, '$1 $2');
  if (tel.length == 13) {
    tel = tel.replace(/(.{4})$/, '-$1');
  } else if (tel.length == 14) {
    tel = tel.replace(/(.{4})$/, '-$1');
  }

  return tel;
};

const phoneInput = document.querySelector('input[name="phone"]');

phoneInput &&
  phoneInput.addEventListener(
    'keyup',
    (event) => (phoneInput.value = phoneMask(event.target.value))
  );

function toggleVisibility(input) {
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
}

const visibility = document.querySelectorAll('.toggle-visibility');
visibility &&
  visibility.forEach((el) => {
    el.addEventListener('click', () => {
      toggleVisibility(el.nextElementSibling);
      el.children[0].classList.toggle('visible');
      el.children[1].classList.toggle('visible');
    });
  });

const form = document.querySelector('.form-content');
const formData = new FormData(form);
const password = document.querySelector('[name=password]');
const confirm_password = document.querySelector('[name=confirm_password]');

confirm_password.addEventListener('keyup', () => {
  confirm_password.parentElement.querySelector('span').style.display = 'none';
});

function validatePassword(input) {
  const validMessage = document.querySelector('.valid');

  if (!input.value.match(/[a-z]/g)) {
    console.log(input.value);
    validMessage.style.display = 'inline-block';
    input.focus();
    validMessage.textContent = 'password must contain a lowercase letter';
    return;
  }

  if (!input.value.match(/[A-Z]/g)) {
    console.log(input.value);
    validMessage.style.display = 'inline-block';
    input.focus();
    validMessage.textContent = 'password must contain a uppercase letter';
    return;
  }

  if (!input.value.match(/[0-9]/g)) {
    console.log(input.value);
    validMessage.style.display = 'inline-block';
    input.focus();
    validMessage.textContent = 'password must contain a number';
    return;
  }
}

let site = document.querySelectorAll('input[name=address_site]');

site &&
  site.forEach((input) =>
    input.addEventListener('change', (e) => {
      if (input.getAttribute('id') === 'site-unchecked') {
        document
          .querySelector('input[name=company]')
          .removeAttribute('required');
      } else {
        document
          .querySelector('input[name=company]')
          .setAttribute('required', true);
      }
    })
  );

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let siteUrl = formData.get('company');
  let siteChecked = document.querySelector('input[name=address_site]:checked');
  if (siteChecked.getAttribute('id') === 'site-unchecked') {
    siteUrl = '';
  }

  validatePassword(password);

  if (password.value !== confirm_password.value) {
    confirm_password.parentElement.querySelector('span').style.display =
      'inline';
    confirm_password.focus();
    return false;
  }

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    ocupation: formData.get('ocupation'),
    password: password.value,
    siteUrl,
  };

  fetch('https://app.rdstation.com.br/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((resp) => {
      document.querySelector('fieldset.feedback').style.display = 'blck';
      document.querySelector('fieldset.inputs').style.display = 'none';
    })
    .catch((err) => console.log(err));
});

const openModalBtn = document.querySelectorAll('.play-video');
const modal = document.querySelector('.wrapper-modal');
const iframe = modal.querySelector('iframe');

modal.addEventListener('click', (e) => {
  if (e.target !== iframe) {
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      '*'
    );
    modal.style.display = 'none';
  }
});

openModalBtn &&
  openModalBtn.forEach((btn) =>
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
    })
  );

const btnOpeMmenu = document.querySelector('.menu-btn');
const menu = document.querySelector('.nav-wrapper');
btnOpeMmenu &&
  btnOpeMmenu.addEventListener('click', () => {
    btnOpeMmenu.children[0].classList.toggle('open');
    btnOpeMmenu.children[1].classList.toggle('open');

    menu.classList.toggle('d-block');
  });

const btnOpeSubmenu = document.querySelector('.has-submenu');
btnOpeSubmenu &&
  btnOpeSubmenu.addEventListener('click', () => {
    btnOpeSubmenu.classList.toggle('active');
    btnOpeSubmenu.querySelector('.submenu').classList.toggle('active');
  });

var slider = tns({
  container: '.card-slider',
  items: 1,
  center: true,
  controls: false,
  navPosition: 'bottom',
  loop: false,
  lazyload: true,
  useLocalStorage: true,
  responsive: {
    320: {
      center: true,
      items: 1,
      autoWidth: true,
    },
    600: {
      items: 2,
      center: false,
    },
    768: {
      disable: true,
    },
  },
});
