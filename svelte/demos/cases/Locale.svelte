<script>
	import { Locale, Segmented } from "wx-svelte-core";
	import { Comments } from "../../src/index";
	import { getData } from "../data";

	import { de, cn } from "wx-comments-locales";
	import { de as deCore, cn as cnCore } from "wx-core-locales";

	const { data, users } = getData();
	const options = [
		{ label: "Bubbles", id: "bubbles" },
		{ label: "Flow", id: "flow" },
	];

	let render = "flow";

	const langs = [
		{ id: "en", label: "EN" },
		{ id: "de", label: "DE" },
		{ id: "cn", label: "CN" },
	];
	let lang = "en";
</script>

<div class="toolbar">
	<Segmented options={langs} bind:value={lang} />
	<Segmented bind:value={render} {options} />
</div>
<div style="margin: auto; max-width: 700px; margin-top: 40px;">
	{#key render}
		{#if lang === "de"}
			<Locale words={{ ...de, deCore }}>
				<Comments
					focus={true}
					value={data}
					{users}
					activeUser={1}
					{render}
				/>
			</Locale>
		{:else if lang === "cn"}
			<Locale words={{ ...cn, cnCore }}>
				<Comments
					focus={true}
					value={data}
					{users}
					activeUser={1}
					{render}
				/>
			</Locale>
		{:else}
			<Comments
				focus={true}
				value={data}
				{users}
				activeUser={1}
				{render}
			/>
		{/if}
	{/key}
</div>

<style>
	.toolbar {
		margin: 20px;
	}
</style>
