<script>
	import { Comments } from "../../src/index";
	import { getData } from "../data";

	import MessageRenderer from "../custom/MessageRenderer.svelte";
	import ContentRenderer from "../custom/ContentRenderer.svelte";

	const { data, users } = getData();

	data.forEach(d => {
		d.content = d.content.replace("Alice", "@[Alice](user:1)");
	});
</script>

<div style="margin: 20px; max-width: 700px; margin-top: 40px;">
	<Comments
		value={data}
		{users}
		activeUser={1}
		render={MessageRenderer}
		format={ContentRenderer}
	/>
</div>
