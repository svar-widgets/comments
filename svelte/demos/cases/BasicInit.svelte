<script>
	import { Segmented } from "@svar-ui/svelte-core";
	import { Comments } from "../../src/index";
	import { getData } from "../data";

	const { data, users } = getData();
	const options = [
		{ label: "Bubbles", id: "bubbles" },
		{ label: "Flow", id: "flow" },
	];

	let render = $state("flow");
</script>

<div class="toolbar">
	<Segmented bind:value={render} {options} />
</div>
<div style="margin: 20px; max-width: 700px; margin-top: 40px;">
	{#key render}
		<Comments focus={true} value={data} {users} activeUser={1} {render} />
	{/key}
</div>

<style>
	.toolbar {
		margin: 20px;
	}
</style>
