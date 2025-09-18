<script>
	import Message from "./Messages/Common.svelte";

	const {
		data,
		render = "blocks",
		format,
		author,
		edit,
		onpost,
		oncancel,
	} = $props();

	const css = $derived(typeof render === "string" ? render : "blocks");
</script>

<div class="wx-messages wx-{css}">
	{#each data as message (message.id)}
		<Message
			content={message.content}
			date={message.date}
			author={message.author}
			owned={message.author.id === author.id ? message.id : null}
			{render}
			{edit}
			format={message.format || format}
			{onpost}
			{oncancel}
		/>
	{/each}
</div>

<style>
	.wx-messages {
		padding: 10px 0;
		display: flex;
		flex-direction: column;
	}

	.wx-messages.wx-bubbles {
		gap: 24px;
	}

	.wx-messages.wx-cards {
		gap: 16px;
	}

	.wx-messages.wx-blocks {
		gap: 24px;
	}
</style>
