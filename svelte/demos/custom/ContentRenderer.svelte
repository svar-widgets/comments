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
	{@html customFormat(content)}
</div>

<style>
	.text :global(a) {
		color: var(--wx-color-primary);
	}
</style>
