const{parse}=require("tldts"),{decrypt}=require("@architect/shared/encryption"),{decompress}=require("@architect/shared/compression"),{errorPage}=require("@architect/shared/errorPage");exports.handler=async function(t){const{subdomain:a}=parse(t.headers.host),o=await decrypt(t.pathParameters.dataString,a),{title:e,bodyHtml:r}=decompress(o);return!e||!r?errorPage:{headers:{"content-type":"text/html; charset=utf8","cache-control":"no-cache, no-store, must-revalidate, max-age=0, s-maxage=0"},statusCode:200,body:`
      <!doctype html>
      <html lang=en>
        <head>
          <meta charset=utf-8>
          <title>${e}</title>
        </head>
        <body>
          ${r}
        </body>
      </html>`}};
