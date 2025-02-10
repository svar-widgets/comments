<script>
	import { Segmented } from "wx-svelte-core";
	import { Comments } from "../../src/index";
	import { getMarkdownData } from "../data";

	const { data, users } = getMarkdownData();
	const options = [
		{ label: "Bubbles", id: "bubbles" },
		{ label: "Flow", id: "flow" },
	];

	let render = "flow";
</script>

<div class="toolbar">
	<Segmented bind:value={render} {options} />
</div>
<div style="margin: auto; max-width: 700px; margin-top: 40px;">
	{#key render}
		<Comments
			value={data}
			{users}
			activeUser={1}
			{render}
			format={"markdown"}
		/>
	{/key}
</div>

<style>
	.toolbar {
		margin: 20px;
	}
</style>
