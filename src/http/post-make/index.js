const{HOST}=require("@architect/shared/constants"),{encrypt,setPassword}=require("@architect/shared/encryption"),{compress}=require("@architect/shared/compression"),getPostedData=t=>{const o=Buffer.from(t,"base64").toString("ascii");return console.log(o),JSON.parse(o)},escapeHtml=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");exports.handler=async function(o){const{title:a,hostUrl:s,bodyHtml:c,preferedPassword:n}=getPostedData(o.body),i=n!==""?n:null,e=s.replace(/(^\w+:|^)\/\//,""),d=compress({title:a,bodyHtml:c},e),r=setPassword(i),l=await encrypt(d,e,r),p=`http://${e}.${HOST}/ess/${encodeURIComponent(l)}`;return{headers:{"content-type":"application/json; charset=utf8","cache-control":"no-cache, no-store, must-revalidate, max-age=0, s-maxage=0"},statusCode:200,body:JSON.stringify({html:`
      <p class="mb-3">Add this as a TXT-record to your domains DNS:</p>
      <code class="inline-block p-4 mb-1 rounded border border-indigo-600 bg-indigo-100 ">"hostl=${escapeHtml(r)}"</code>
      <p class="mb-6 text-sm text-gray-500">Don't forget to include the double quotes</p>
      
      <p class="mb-3">...and optionally the following as a CNAME-record:</p>
      <code class="inline-block p-4 mb-6 rounded border border-indigo-600 bg-indigo-100 ">${e}</code>

      <p class="mb-3">When this is done you can access the site here:</p>
      <a class="inline-block p-4 bg-indigo-500 text-white rounded" href="${p}" target="_blank">${e}.${HOST}/ess/&hellip;</a>
      <a class="inline-block p-4 bg-indigo-500 text-white rounded" href="${s}" target="_blank">${e}</a>
      `})}};
