<script>
	import { Segmented } from "@svar-ui/svelte-core";
	import { RestURL } from "@svar-ui/lib-data-provider";
	import { Comments } from "../../src/index";
	import { getData } from "../data";

	const url = new RestURL(
		"https://master--svar-comments-go--dev.webix.io/comments"
	);
	const users = getData().users;

	let id = $state(1);
	const options = [
		{ id: 1, label: "Page 1" },
		{ id: 2, label: "Page 2" },
	];
</script>

<div>
	<div class="toolbar">
		<Segmented bind:value={id} {options} />
	</div>
	<div class="comments">
		<Comments
			{url}
			value={id}
			ondata={v => url.get(v)}
			onchange={({ action, comment, id, originalValue: v }) =>
				url.path(v).save(action, comment, id)}
			activeUser={1}
			{users}
		/>
	</div>
</div>

<style>
	.toolbar {
		height: 56px;
		padding: 12px;
	}
	.comments {
		margin: 20px;
		max-width: 768px;
		height: calc(100% - 56px);
	}
</style>
