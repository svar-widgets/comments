<script>
	import { WillowDark } from "wx-svelte-core";

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

		--wx-comments-background: #2b343b;
		--wx-comments-line-height: 24px;
		--wx-comments-border: 1px solid #384047;

		--wx-comments-msg-background: rgba(122, 102, 235, 0.2);
		--wx-comments-msg-background-agent: #384047;
		--wx-comments-msg-background-hover: rgb(122, 103, 235, 0.1);
		--wx-comments-avatar-icon-color: #2b343b;
		--wx-comments-msg-blocks-background: #384047;
		--wx-comments-msg-blocks-background-agent: #20262b;
		--wx-comments-msg-controls-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.16);

		--wx-comments-sidebar-background: #2a2b2d;
		--wx-comments-sidebar-chat-hover: #384047;

		--wx-comments-popup-agent-hover: #384047;
		--wx-comments-popup-border: var(--wx-comments-border);
		--wx-comments-popup-background: #2a2b2d;

		--wx-comments-textarea-border: var(--wx-comments-border);
		--wx-comments-textarea-focus-border: 1px solid var(--wx-color-primary);
		--wx-comments-textarea-color: rgba(255, 255, 255, 0.9);

		--wx-comments-button-icon--color-disabled: #20262b;

		--wx-comments-scroll-background: #20262b;
		--wx-comments-slider-background: #384047;

		--ww-chat-modal-background: #2b343b;

		--wx-comments-header-background: #2a2b2d;
		--wx-comments-icon-color: #9fa1ae;

		--wx-comments-button-toggle-sidebar-background: #384047;

		--wx-avatar-color-dark: #2a2b2d;
	}
</style>
