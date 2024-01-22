document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const fecha_nacimiento = document.getElementById('fecha_nacimiento');
  const pais = document.getElementById('pais');
  const provincia = document.getElementById('provincia');
  const codigo = document.getElementById('codigo');
  const telefono = document.getElementById('telefono');
  const correo = document.getElementById('correo');
  const terminos = document.getElementById('terminos');
  const politica = document.getElementById('politica');
  const submitButton = document.getElementById('submit_button');
  const startButton = document.getElementById('startButton');

  const pages = document.querySelectorAll('section');
  const prevBtn = document.getElementById('previous_icon');
  const nextBtn = document.getElementById('next_icon');
  const tabletPrevBtn = document.getElementById('prev_btn');
  const tabletNextBtn = document.getElementById('next_btn');
  let currentPageIndex = 0;

  function showPage(index) {
    console.log({ pages });
    window.location = `#page${index + 1}`;
  }

  prevBtn.addEventListener('click', function () {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      showPage(currentPageIndex);
    }
  });

  nextBtn.addEventListener('click', function () {
    if (currentPageIndex < pages.length - 1) {
      currentPageIndex++;
      showPage(currentPageIndex);
    }
  });

  startButton.addEventListener('click', function () {
    currentPageIndex++;
    window.location = '#page2';
  });

  function showPageTabSlider(index) {
    console.log('index -----', index);
    if (index === 0) {
      pages[index + 1].style.zIndex = 1;
    } else if (index === pages.length - 1) {
      pages[index - 1].style.zIndex = 1;
    } else {
      pages[index + 1].style.zIndex = 1;
      pages[index - 1].style.zIndex = 1;
    }
    pages[index].style.zIndex = 2;
  }

  tabletPrevBtn.addEventListener('click', function () {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      showPageTabSlider(currentPageIndex);
    }
  });

  tabletNextBtn.addEventListener('click', function () {
    if (currentPageIndex < pages.length - 1) {
      currentPageIndex++;
      showPageTabSlider(currentPageIndex);
    }
  });

  function showError(input) {
    input.className = 'input_error';
  }

  function showSuccess(input) {
    input.className = '';
  }

  function showErrorCheckbox(input) {
    input.className = 'checkbox_error';
  }

  function showSuccessCheckbox(input) {
    input.className = '';
  }

  // function checkEmail(input) {
  //   const regEx =
  //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (regEx.test(input.value.trim())) {
  //     showSuccess(input);
  //   } else {
  //     showError(input);
  //   }
  // }

  function checkRequired(inputArr) {
    const statusArr = [];

    inputArr.forEach(function (input) {
      if (input.value.trim() === '') {
        showError(input);
        statusArr.push(false);
      } else {
        showSuccess(input);
      }
    });

    if (statusArr.length !== 0) {
      return false;
    }

    return true;
  }

  function checkCheckbox(inputArr) {
    const statusArr = [];

    inputArr.forEach(function (input) {
      if (!input.checked) {
        showErrorCheckbox(input);
        statusArr.push(false);
      } else {
        showSuccessCheckbox(input);
      }
    });

    if (statusArr.length !== 0) {
      return false;
    }

    return true;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('clicked submit button');
    const statusInputsRequired = checkRequired([
      nombre,
      apellido,
      fecha_nacimiento,
      pais,
      provincia,
      codigo,
      telefono,
      correo,
    ]);
    const statusCheckbox = checkCheckbox([terminos, politica]);

    if (statusCheckbox && statusInputsRequired) {
      submitButton.innerHTML = 'ENVIANDO...';
      submitButton.disabled = true;
      fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          fecha_nacimiento,
          pais,
          provincia,
          codigo,
          telefono,
          correo,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          submitButton.disabled = false;
          submitButton.innerHTML = 'ENVIAR';
          submitButton.disabled = false;
          nombre.value = '';
          apellido.value = '';
          fecha_nacimiento.value = '';
          pais.value = '';
          provincia.value = '';
          telefono.value = '';
          correo.value = '';
          terminos.checked = false;
          politica.checked = false;
        })
        .catch((error) => console.log(error));

      window.location = '#page7';
    }
  });
});
