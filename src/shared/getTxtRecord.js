const dnsPromises=require("dns").promises,getTxtRecord=async e=>{const[[s]]=await dnsPromises.resolve(e,"TXT");return s};exports.getTxtRecord=getTxtRecord;
