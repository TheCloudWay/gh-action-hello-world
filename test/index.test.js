const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');

const { run } = require('../src/index.js');

function resetInputs() {
  for (const key of Object.keys(process.env)) {
    if (key.startsWith('INPUT_')) {
      delete process.env[key];
    }
  }
  process.exitCode = 0;
}

beforeEach(() => {
  resetInputs();
});

afterEach(() => {
  process.exitCode = 0;
});

function captureStdout(fn) {
  const chunks = [];
  const original = process.stdout.write;
  process.stdout.write = (chunk, ...args) => {
    chunks.push(chunk.toString());
    return original.call(process.stdout, chunk, ...args);
  };
  return Promise.resolve(fn()).finally(() => {
    process.stdout.write = original;
  }).then(() => chunks.join(''));
}

test('greets using the default greeting', async () => {
  process.env.INPUT_NAME = 'World';

  const output = await captureStdout(run);

  assert.notStrictEqual(process.exitCode, 1);
  assert.match(output, /Hello, World!/);
});

test('uses a custom greeting', async () => {
  process.env.INPUT_NAME = 'Cloud';
  process.env.INPUT_GREETING = 'Hey';

  await run();

  assert.notStrictEqual(process.exitCode, 1);
});

test('fails when name is missing', async () => {
  resetInputs();

  await run();

  assert.strictEqual(process.exitCode, 1, 'should fail without a name');
});
