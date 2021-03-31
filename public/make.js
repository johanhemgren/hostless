document.addEventListener('DOMContentLoaded', function() {
  const form = document.forms[0];
  const submitButton = form.querySelector('[type="submit"]');
  
  const toggleSubmit = (toggle=false) => {
    console.log('toggleSubmit', toggle);
    submitButton[!toggle ? 'setAttribute' : 'removeAttribute']('disabled', !toggle);
    submitButton.classList[!toggle ? 'add' : 'remove']('pointer-events-none', 'cursor-auto', 'border-gray-200', 'text-gray-200')
    submitButton.classList[toggle ? 'add' : 'remove']('border-indigo-500', 'hover:border-indigo-600', 'text-indigo-500', 'hover:text-indigo-600');
  }
  
  const getFormData = (formElement) => {
    const formData = new FormData(formElement);
    const entries = formData.entries();
  
    return Object.fromEntries(entries);
  }
  
  const postData = async data => {
    const response = await fetch('make', {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
  
    const {html=''} = await response.json();
    const responseMessage = document.createElement('div');
  
    responseMessage.classList.add('text-center');
    responseMessage.innerHTML = html;
    
    form.appendChild(responseMessage);
  }
  
  form.addEventListener('submit', async e => {
    e.preventDefault();
  
    toggleSubmit(false);
    postData(getFormData(e.target));
  });
  
  toggleSubmit(true);
}, false);