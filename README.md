# Hello World Action

[![Release](https://github.com/TheCloudWay/gh-action-hello-world/actions/workflows/release.yml/badge.svg)](https://github.com/TheCloudWay/gh-action-hello-world/actions/workflows/release.yml)
[![CI](https://github.com/TheCloudWay/gh-action-hello-world/actions/workflows/ci.yml/badge.svg)](https://github.com/TheCloudWay/gh-action-hello-world/actions/workflows/ci.yml)

A friendly **Hello World** GitHub Action written in JavaScript. It is the companion example for
the blog post *"Build a GitHub Action (and a Skill that writes it for you)"*.

## Usage

```yaml
- name: Say hello
  id: hello
  uses: TheCloudWay/gh-action-hello-world@v1
  with:
    name: Cloud
    greeting: Hey # optional, defaults to "Hello"

- run: echo "${{ steps.hello.outputs.message }}"
```

## Inputs

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `name` | yes | - | Who to greet. |
| `greeting` | no | `Hello` | The greeting word to use. |

## Outputs

| Name | Description |
|------|-------------|
| `message` | The full greeting message (e.g. `Hey, Cloud!`). |

## Versioning

Released automatically with [semantic-release](https://semantic-release.gitbook.io/) from
[Conventional Commits](https://www.conventionalcommits.org/): `master` -> stable (`vX.Y.Z` + the
floating `v1` tag), `beta` -> prereleases.

## Development

```bash
npm install   # installs deps and builds dist/ (prepare hook)
npm test
npm run build # rebuild after editing src/, then commit dist/
```

`dist/` is committed on purpose: GitHub runs `dist/index.js` directly, with no build step at
runtime.

## License

[MIT](LICENSE) - The Cloud Way.
