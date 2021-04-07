const{parse}=require("tldts"),{decrypt}=require("@architect/shared/encryption"),{decompress}=require("@architect/shared/compression"),{errorPage}=require("@architect/shared/errorPage");exports.handler=async function(t){const{subdomain:r}=parse(t.headers.host),a=await decrypt(t.pathParameters.dataString,r),e=decompress(a);return!(e==null?void 0:e.title)||!(e==null?void 0:e.bodyHtml)?errorPage:{headers:{"content-type":"text/html; charset=utf8","cache-control":"no-cache, no-store, must-revalidate, max-age=0, s-maxage=0"},statusCode:200,body:`
      <!doctype html>
      <html lang=en>
        <head>
          <meta charset=utf-8>
          <title>${e==null?void 0:e.title}</title>
        </head>
        <body>
          ${e==null?void 0:e.bodyHtml}
        </body>
      </html>`}};
