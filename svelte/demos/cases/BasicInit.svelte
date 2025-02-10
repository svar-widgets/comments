<script>
	import { Segmented } from "wx-svelte-core";
	import { Comments } from "../../src/index";
	import { getData } from "../data";

	const { data, users } = getData();
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
		<Comments focus={true} value={data} {users} activeUser={1} {render} />
	{/key}
</div>

<style>
	.toolbar {
		margin: 20px;
	}
</style>
