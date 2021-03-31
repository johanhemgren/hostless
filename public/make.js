document.addEventListener('DOMContentLoaded', function() {
  const form = document.forms[0];
  const submitButton = form.querySelector('[type="submit"]');
  
  const toggleSubmit = (toggle=false) => {
    submitButton[!toggle ? 'setAttribute' : 'removeAttribute']('disabled', !toggle);
    submitButton.classList[!toggle ? 'add' : 'remove']('pointer-events-none', 'cursor-auto', 'border-gray-200', 'text-gray-200')
    submitButton.classList[toggle ? 'add' : 'remove']('border-indigo-500', 'hover:border-indigo-600', 'text-indigo-500', 'hover:text-indigo-600');
  }
  
  const toggleFormVisibility = (toggle=false) => {
    form.style.opacity = toggle ? '1' : '0';

    return new Promise(resolve => setTimeout(() => resolve(), 500));
  }
  
  const getFormData = (formElement) => {
    const formData = new FormData(formElement);
    const entries = formData.entries();
  
    return Object.fromEntries(entries);
  }

  const viewResult = async (html, element) => {
    if (!html) {
      await toggleFormVisibility(true);

      return;
    };

    const responseMessage = document.createElement('div');
    const elementHeight = element.getBoundingClientRect().height;
  
    responseMessage.classList.add('text-center');
    responseMessage.innerHTML = html;
    
    element.style.height = `${elementHeight}px`;

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    element.appendChild(responseMessage);
    toggleFormVisibility(true);
  }
  
  const postData = async form => {
    await toggleFormVisibility(false);

    const data = getFormData(form);

    const response = await fetch('make', {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    }).catch(error => {
      toggleFormVisibility(true);
      console.warn(error);
    });
  
    const {html=null} = await response.json();

    viewResult(html, form);
  }
  
  form.addEventListener('submit', async e => {
    e.preventDefault();
  
    toggleSubmit(false);
    postData(e.target);
  });
  
  toggleSubmit(true);
}, false);