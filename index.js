var http = require('http');

var wyborLN = '<html>' +
'<head>' +
'<title>LN Manager</title>' +
'<meta charset="utf-8">' +
'</head>' +
'<body>' +
'<form method="post" action="">' +
'<div>' +
'<label for="nickname">Moduł:</label>' +
'<select>' +
' <option value="digital">LN Digital</option>' +
' <option value="hub">LN HUB32IO</option>' +
' <option value="io">LN IO</option>' +
'</select>' + 
'</div>' +
'<div>' +
'<input type="submit" value="Wybierz">' +
'</div>' +
'</form>' +
'</body>' +
'</html>';



http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(wyborLN);
  
}).listen(80, "0.0.0.0");
console.log('Server running at http://127.0.0.1:80/');
