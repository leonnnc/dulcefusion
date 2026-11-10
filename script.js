/* ============================================================
   Dulce Fusion - Encuesta de Brookies
   Lógica del formulario (pasos, progreso, validación y envío)
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // CONFIGURACIÓN DE ENVÍO
  // Reemplaza la URL de abajo por tu endpoint de Formspree
  // Ejemplo: https://formspree.io/f/xxxxxxxx
  // ============================================================
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_ID_DE_FORMSPREE';

  // Elementos del DOM
  const intro = document.getElementById('intro');
  const form = document.getElementById('survey-form');
  const startBtn = document.getElementById('start-btn');
  const successMessage = document.getElementById('success-message');

  const progressFill = document.getElementById('progress-fill');
  const currentStepEl = document.getElementById('current-step');
  const totalStepsEl = document.getElementById('total-steps');

  const prevBtn = document.getElementById('prev-btn');
  const submitBtn = document.getElementById('submit-btn');

  const steps = document.querySelectorAll('.step');
  const totalSteps = steps.length;

  let currentStep = 0;

  // Configuración
  totalStepsEl.textContent = totalSteps;

  // Mostrar un paso específico y ocultar los demás
  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
    });

    currentStep = index;
    currentStepEl.textContent = index + 1;

    // Actualizar barra de progreso
    const percent = ((index + 1) / totalSteps) * 100;
    progressFill.style.width = `${percent}%`;

    // Botón atrás solo desde el paso 1 en adelante
    prevBtn.style.display = index === 0 ? 'none' : 'inline-flex';
    // Botón enviar solo en el último paso
    submitBtn.style.display = index === totalSteps - 1 ? 'inline-flex' : 'none';

    // Scroll suave al inicio del formulario
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Iniciar encuesta: oculta la introducción y muestra el primer paso
  startBtn.addEventListener('click', () => {
    intro.style.display = 'none';
    form.classList.add('visible');
    showStep(0);
  });

  // Navegación hacia adelante: validar el paso actual antes de avanzar
  document.querySelectorAll('.step').forEach((step) => {
    step.addEventListener('click', (e) => {
      // Si se hace clic en un botón "Siguiente" (si existiera), se manejaría aquí.
      // Actualmente se avanza con los botones de radio/checkbox al seleccionar.
    });
  });

  // Avanzar automáticamente al seleccionar una opción (radio)
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const stepIndex = Array.from(steps).findIndex((s) => s.contains(radio));
      if (stepIndex !== -1 && stepIndex < totalSteps - 1) {
        // Pequeña pausa para que el usuario vea la selección
        setTimeout(() => showStep(stepIndex + 1), 350);
      }
    });
  });

  // Para checkboxes, no avanzamos automáticamente (pueden elegir varias).
  // El usuario debe usar el botón "Siguiente" implícito al marcar la última o
  // simplemente continuamos cuando cambie. Aquí dejamos que avance al marcar cualquier checkbox.
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const stepIndex = Array.from(steps).findIndex((s) => s.contains(checkbox));
      if (stepIndex !== -1 && stepIndex < totalSteps - 1) {
        setTimeout(() => showStep(stepIndex + 1), 350);
      }
    });
  });

  // Botón atrás
  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });

  // Validación de campos obligatorios por paso
  function validateStep(index) {
    const step = steps[index];
    const inputs = step.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    // Limpiar errores previos del paso
    step.querySelectorAll('.form-group').forEach((group) => {
      group.classList.remove('error');
      const err = group.querySelector('.error-text');
      if (err) err.remove();
    });

    inputs.forEach((input) => {
      const group = input.closest('.form-group');

      if (input.type === 'radio') {
        const name = input.name;
        const checked = step.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
          showFieldError(group, 'Selecciona una opción.');
          isValid = false;
        }
      } else if (input.type === 'checkbox') {
        const name = input.name;
        const checked = step.querySelectorAll(`input[name="${name}"]:checked`);
        if (checked.length === 0) {
          showFieldError(group, 'Selecciona al menos una opción.');
          isValid = false;
        }
      } else if (!input.value.trim()) {
        showFieldError(group, 'Este campo es obligatorio.');
        isValid = false;
      }
    });

    return isValid;
  }

  function showFieldError(group, message) {
    group.classList.add('error');
    const existing = group.querySelector('.error-text');
    if (existing) return;

    const err = document.createElement('span');
    err.className = 'error-text';
    err.textContent = message;
    group.appendChild(err);
  }

  // Envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validar paso actual antes de enviar
    if (!validateStep(currentStep)) {
      return;
    }

    // Recopilar datos
    const formData = new FormData(form);
    const data = {};

    // Campos de texto, número, textarea
    data.firstName = formData.get('first-name') || '';
    data.lastName = formData.get('last-name') || '';
    data.gender = formData.get('gender') || '';
    data.age = formData.get('age') || '';
    data.comments = formData.get('comments') || '';

    // Preguntas de radio (valor único)
    for (let i = 1; i <= 6; i++) {
      const key = `q${i}`;
      data[key] = formData.get(key) || '';
    }

    // Preguntas de checkbox (arreglo)
    data.q3 = formData.getAll('q3') || [];
    data.q5 = formData.getAll('q5') || [];

    // Enviar datos a Formspree
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const payload = {
      ...data,
      q3: Array.isArray(data.q3) ? data.q3.join(', ') : data.q3,
      q5: Array.isArray(data.q5) ? data.q5.join(', ') : data.q5,
      fecha: new Date().toLocaleString('es-ES')
    };

    if (FORMSPREE_ENDPOINT.includes('TU_ID_DE_FORMSPREE')) {
      console.warn('⚠️ Aún no configuraste tu endpoint de Formspree en script.js');
      console.log('Datos que se enviarían:', payload);

      // Simulación solo mientras no se configure el endpoint real
      setTimeout(() => {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar encuesta';
      }, 1200);
      return;
    }

    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al enviar');
        return response.json();
      })
      .then(() => {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar encuesta';
      })
      .catch((error) => {
        console.error(error);
        alert('Hubo un error al enviar la encuesta. Intenta de nuevo.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar encuesta';
      });
  });

  // Validación en tiempo real: quitar estilos de error al escribir/seleccionar
  form.addEventListener('input', (e) => {
    const group = e.target.closest('.form-group');
    if (group && group.classList.contains('error')) {
      group.classList.remove('error');
      const err = group.querySelector('.error-text');
      if (err) err.remove();
    }
  });

  form.addEventListener('change', (e) => {
    const group = e.target.closest('.form-group');
    if (group && group.classList.contains('error')) {
      group.classList.remove('error');
      const err = group.querySelector('.error-text');
      if (err) err.remove();
    }
  });

})();