exports.errorPage = {
  headers: {'content-type': 'text/html; charset=utf8'},
  statusCode: 404,
  body: `
    <!doctype html>
    <html lang=en>
      <head>
        <meta charset=utf-8>
        <title>Hos.tl/ess!</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>
        <div class="flex items-center justify-center h-screen w-full bg-gray-100">
          <h1 class="block w-full text-5xl font-black text-center text-grey-900 mb-6">404</h1>
        </div>
      </body>
    </html>`,
}