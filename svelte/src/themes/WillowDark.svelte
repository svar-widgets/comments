<script>
	import { WillowDark } from "@svar-ui/svelte-core";

	const { children, fonts } = $$props;
</script>

{#if children}
	<WillowDark {fonts}>
		{@render children()}
	</WillowDark>
{:else}
	<WillowDark {fonts} />
{/if}

<style>
	:global(.wx-willow-dark-theme) {
		--wx-theme-name: willow-dark;

		--wx-comments-msg-background: rgba(122, 102, 235, 0.2);
		--wx-comments-msg-background-agent: #384047;

		--wx-avatar-color-dark: #2a2b2d;
	}
</style>
