const core = require('@actions/core');

async function run() {
  try {
    const name = core.getInput('name', { required: true });
    const greeting = core.getInput('greeting') || 'Hello';

    const message = `${greeting}, ${name}!`;

    core.info(message);
    core.setOutput('message', message);
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

module.exports = { run };

// Only auto-run when executed as the entrypoint (not when imported in tests).
if (require.main === module) {
  run();
}
