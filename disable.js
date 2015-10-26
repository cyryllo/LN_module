var exec = require('exec');

exec('gpio -x mcp23s17:100:0:0 write 100 0', function(err, out, code) {
  if (err instanceof Error)
    throw err;
  process.stderr.write(err);
  process.stdout.write(out);
  process.exit(code);
});
