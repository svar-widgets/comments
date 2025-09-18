<script>
	import { Material } from "@svar-ui/svelte-core";

	const { children, fonts } = $$props;
</script>

{#if children}
	<Material {fonts}>
		{@render children()}
	</Material>
{:else}
	<Material {fonts} />
{/if}

<style>
	:global(.wx-material-theme) {
		--wx-theme-name: material;

		--wx-comments-msg-background: #d5e6ff;
		--wx-comments-msg-background-agent: #f7f7f7;

		--wx-avatar-color-dark: rgba(0, 0, 0, 0.7);
	}
</style>
