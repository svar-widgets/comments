<div align="center">

# SVAR Svelte Comments

[![npm](https://img.shields.io/npm/v/wx-svelte-comments.svg)](https://www.npmjs.com/package/wx-svelte-comments)
[![License](https://img.shields.io/github/license/svar-widgets/comments)](https://github.com/svar-widgets/comments/blob/main/license.txt)
[![npm downloads](https://img.shields.io/npm/dm/wx-svelte-comments.svg)](https://www.npmjs.com/package/wx-svelte-comments)

</div>

<div align="center">

[Documentation](https://docs.svar.dev/svelte/core/comments/) • [Demos](https://docs.svar.dev/svelte/core/samples-comments/#/base/willow)

</div>

A Svelte UI component for creating a comments section. Supports adding, editing, and deleting comments with ease.

<div align="center">
	
<img src="https://svar.dev/images/github/github-commenta.png" alt="SVAR Comments - Svelte Comments Section" style="width: 700px;">

</div>

### How to Use

To use the widget, simply import the package and include the component in your Svelte file:

```svelte
<script>
	import { Comments } from "wx-svelte-comments";

	const value = [];
</script>

<Comments {value} />
```

For further instructions, visit the [documentation](https://docs.svar.dev/svelte/core/comments/). 

### How to Modify

Typically, you don't need to modify the code. However, if you wish to do so, follow these steps:

1. Run `yarn` to install dependencies. Note that this project is a monorepo using `yarn` workspaces, so npm will not work
2. Start the project in development mode with `yarn start`

### Run Tests

To run the test:

1. Start the test examples with:
    ```sh
    yarn start:tests
    ```
2. In a separate console, run the end-to-end tests with:
    ```sh
    yarn test:cypress
    ```
