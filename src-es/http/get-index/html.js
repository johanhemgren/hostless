const arc = require('@architect/functions');
const { formFields } = require('./formFields');
const { classNames } = require('./classNames');
const { exampleHtml } = require('./exampleHtml');

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
        <h1 class="${classNames.heading}">Create a <strong style="white-space:nowrap;">hos.tl/ess</strong> site</h1>
        <form class="transition-opacity duration-500">
          ${formFields.map(({id, type, label, value}) => (`
            <div class="${classNames.group}">
              <label for="${id}" class="${classNames.label}">${label}</label>
              <input type="${type}" id="${id}" name="${id}" class="${classNames.input}" value="${value}"/>
            </div>
          `)).join('')}
          <div class="${classNames.group}">
            <label for="bodyHtml" class="${classNames.label}">HTML Content</label>
            <textarea id="bodyHtml" name="bodyHtml" class="${classNames.input}">${exampleHtml}</textarea>
          </div>
          <div class="${classNames.group}">
            <button type="submit" class="${classNames.button} disabled" disabled>Submit</button>
          </div>
        </form>
      </div>
    </div>
    <script src=${arc.static('/dist/make.js')}></script>
  </body>
</html>`;

exports.html = html.trim();
