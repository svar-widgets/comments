<script>
	import { Willow } from "wx-svelte-core";

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

		--wx-comments-background: #ffffff;
		--wx-comments-line-height: 24px;
		--wx-comments-border: 1px solid #e6e6e6;

		--wx-comments-msg-background: #d5eaf7;
		--wx-comments-msg-background-agent: #f4f5f9;
		--wx-comments-msg-background-hover: rgba(57, 169, 239, 0.03);
		--wx-comments-avatar-icon-color: #ffffff;
		--wx-comments-msg-blocks-background: #e6e6e6;
		--wx-comments-msg-blocks-background-agent: #ffffff;
		--wx-comments-msg-controls-shadow: 0px 3px 10px 0px
				rgba(44, 47, 60, 0.12),
			0px 1px 2px 0px rgba(44, 47, 60, 0.06);

		--wx-comments-sidebar-background: #fafafc;
		--wx-comments-sidebar-chat-hover: #eaedf5;

		--wx-comments-popup-agent-hover: #f7f7f7;
		--wx-comments-popup-border: 1px solid #ffffff;
		--wx-comments-popup-background: #ffffff;

		--wx-comments-textarea-border: var(--wx-comments-border);
		--wx-comments-textarea-focus-border: 1px solid var(--wx-color-primary);
		--wx-comments-textarea-color: #475466;

		--wx-comments-button-icon--color-disabled: #9fa1ae;

		--wx-comments-scroll-background: #e6e6e6;
		--wx-comments-slider-background: #f2f3f7;

		--ww-chat-modal-background: #ffffff;

		--wx-comments-header-background: rgba(122, 103, 235, 0.2);
		--wx-comments-icon-color: #9fa1ae;

		--wx-comments-button-toggle-sidebar-background: #f2f3f7;

		--wx-avatar-color-dark: #2a2b2d;
	}
</style>
