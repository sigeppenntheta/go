var endpoint = "https://getpantry.cloud/apiv1/pantry/3d2c100e-3d1a-4fb5-9757-b36769125c06/basket/links"

var simplecopy=function(){var d=document,b,cs,ss,f=false,n=d.createElement("DIV"),s=n.style;s.position="fixed";s.color="rgba(0,0,0,0)";function sc(t){if(!b){b=d.body};n.innerText=t;b.appendChild(n);ss=x(n);cs=d.execCommand("copy",f,null);b.removeChild(n);return ss&&cs};function x(n){var r,s,w=window.getSelection,c=b.createTextRange;if(c){r=c();r.moveToElementText(n);r.select();return !f}else if(w){s=w();r=d.createRange();r.selectNodeContents(n);s.removeAllRanges();s.addRange(r);return !f}else {return f}}return sc}();

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

function genhash(){
    if (window.location.hash == ""){
        window.location.hash = getrandom();
    }
}

function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
    simplecopy(window.location.href);
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}
