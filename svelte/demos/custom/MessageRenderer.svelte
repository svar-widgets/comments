<script>
	let { owned, author, date, children } = $props();
</script>

<div class:owned={owned == author.id} style="padding-left:8px">
	<b>{author.name}</b> |
	<span class="date">{date.toLocaleString()}</span>
	{@render children()}
</div>

<style>
	.date {
		font-size: var(--wx-font-size-sm);
		color: var(--wx-color-font-alt);
	}
	.owned {
		border-left: 2px solid var(--wx-color-primary);
	}
</style>
