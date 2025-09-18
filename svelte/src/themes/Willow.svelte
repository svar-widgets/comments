<script>
	import { Willow } from "@svar-ui/svelte-core";

	const { children, fonts } = $$props;
</script>

{#if children}
	<Willow {fonts}>
		{@render children()}
	</Willow>
{:else}
	<Willow {fonts} />
{/if}

<style>
	:global(.wx-willow-theme) {
		--wx-theme-name: willow;

		--wx-comments-msg-background: #d5eaf7;
		--wx-comments-msg-background-agent: #f4f5f9;

		--wx-avatar-color-dark: #2a2b2d;
	}
</style>
