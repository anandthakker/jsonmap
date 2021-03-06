var exec = require('child_process').exec;

exec('cat test.json | node cli.js \"{dog: this.dog}\"',
  expect('{"dog":5}\n{"dog":6}\n'));

exec('cat test.json | node cli.js --file=test-transform.js',
  expect('{"summary":["foo","dog"]}\n{"summary":["baz","dog"]}\n'));

exec('cat test.json | node cli.js \"{dog: this.dog}\" | node cli.js --file=test-transform2.js',
  expect('{"dog":6}\n{"dog":7}\n'));

function expect(output) {
  function done(err, stdout, stderr) {
    if(stdout !== output) {
      throw new Error('Expected '+output+'\nActual: '+stdout);
    }
    console.log(stdout);
    if(err) { throw err; }
  }
  
  return done;
}
