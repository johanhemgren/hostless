let arc = require('@architect/functions');

const classes = {
  heading: 'block w-full text-5xl font-black text-indigo-800 text-center mb-6',
  group: 'flex flex-col mb-6',
  label: 'mb-2 font-bold text-lg text-indigo-800',
  input: 'border rounded border-indigo-500 focus:border-indigo-700 bg-indigo-100 py-2 px-3 text-indigo-600',
  button: 'block border-2 border-indigo-500 hover:border-indigo-600 text-indigo-500 hover:text-indigo-600 text-lg mx-auto p-4 rounded',
};

const formFields = [
  {
    id: 'title',
    type: 'text',
    label: 'Website Title',
    value: 'This is a website title...',
  },
  {
    id: 'hostUrl',
    type: 'url',
    label: 'URL to host the website',
    value: 'http://prodprod.se',
  },
  {
    id: 'preferedPassword',
    type: 'password',
    label: 'Choose a password',
    value: 'keyString',
  },
];

const exampleHtml = `
<h1>Lorem ipsum dolor sit amet consectetuer adipiscing lit</h1>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing lit. Aenean commodo ligula eget dolor. Aenean massa 
<strong>strong</strong>. Cum sociis natoque penatibus t magnis dis parturient montes, nascetur ridiculus us. Donec quam felis, ultricies nec, pellentesque u, pretium quis, sem. Nulla consequat massa quis nim. Donec pede justo, fringilla vel, aliquet nec, ulputate eget, arcu. In enim justo, rhoncus ut, mperdiet a, venenatis vitae, justo. Nullam dictum elis eu pede <a class="external ext" href="#">link</a> ollis pretium. Integer tincidunt. Cras dapibus. ivamus elementum semper nisi. Aenean vulputate leifend tellus. Aenean leo ligula, porttitor eu, onsequat vitae, eleifend ac, enim. Aliquam lorem ante, apibus in, viverra quis, feugiat a, tellus. Phasellus iverra nulla ut metus varius laoreet. Quisque rutrum. enean imperdiet. Etiam ultricies nisi vel augue. urabitur ullamcorper ultricies nisi.</p>
<h1>Lorem ipsum dolor sit amet consectetuer adipiscing lit</h1>
<h2>Aenean commodo ligula eget dolor aenean massa</h2>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing lit. Aenean commodo ligula eget dolor. Aenean massa. um sociis natoque penatibus et magnis dis parturient ontes, nascetur ridiculus mus. Donec quam felis, ltricies nec, pellentesque eu, pretium quis, sem.</p>
<h2>Aenean commodo ligula eget dolor aenean massa</h2>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing lit. Aenean commodo ligula eget dolor. Aenean massa. um sociis natoque penatibus et magnis dis parturient ontes, nascetur ridiculus mus. Donec quam felis, ltricies nec, pellentesque eu, pretium quis, sem.</p>
<ul>
  <li>Lorem ipsum dolor sit amet consectetuer.</li>
  <li>Aenean commodo ligula eget dolor.</li>
  <li>Aenean massa cum sociis natoque penatibus.</li>
</ul>`;

const html = `
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>Hos.tl/ess!</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-yellow-100">
    <div class="flex items-center justify-center h-screen w-full">
      <div class="w-full max-w-screen-lg bg-white rounded shadow-lg p-8 m-4">
        <h1 class="${classes.heading}">Create a <strong style="white-space:nowrap;">hos.tl/ess</strong> site</h1>
        <form>
          ${formFields.map(({id, type, label, value}) => (`
            <div class="${classes.group}">
              <label for="${id}" class="${classes.label}">${label}</label>
              <input type="${type}" id="${id}" name="${id}" class="${classes.input}" value="${value}"/>
            </div>
          `)).join('')}
          <div class="${classes.group}">
            <label for="bodyHtml" class="${classes.label}">HTML Content</label>
            <textarea id="bodyHtml" name="bodyHtml" class="${classes.input}">${exampleHtml}</textarea>
          </div>
          <div class="${classes.group}">
            <button type="submit" class="${classes.button} disabled" disabled>Submit</button>
          </div>
        </form>
      </div>
    </div>
    <script src=${arc.static('/make.js')}></script>
  </body>
</html>`;

exports.html = html.trim();
