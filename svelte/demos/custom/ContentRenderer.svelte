<script>
	let { content } = $props();

	const customFormat = text => {
		// Convert @mentions: @[Name](user:id) -> <a href="/users/id">Name</a>
		return text.replace(
			/@\[(.*?)\]\(user:(\d+)\)/g,
			'<a href="/users/$2">$1</a>'
		);
	};
</script>

<div class="text">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html customFormat(content)}
</div>

<style>
	.text :global(a) {
		color: var(--wx-color-primary);
	}
</style>
