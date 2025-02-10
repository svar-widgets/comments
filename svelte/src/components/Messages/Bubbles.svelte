<script>
	import { getContext } from "svelte";
	import UserIcon from "./UserIcon.svelte";

	const {
		owned,
		author,
		date,
		edit,
		children,
	} = $props();

	const dateFormatter = getContext("wx-comments-format").dateStr;
</script>

<div class="wx-bubble" class:wx-owned={owned}>
	<div class="wx-bubble-wrapper">
		<div class="wx-avatar">
			<UserIcon data={author} />
		</div>
		<div class="wx-main-bubble">
			<span class="wx-author-name">{author.name}</span>
			{#if owned}
				<div class="wx-agent-message">
					<div class="wx-message">
						{@render children()}
						{#if edit !== owned}<div class="wx-comment-date">
								{dateFormatter(date)}
							</div>{/if}
					</div>
					<div class="wx-menu-icon" data-comment-menu-id={owned}>
						<i class="wx-icon wxi-dots-v"></i>
					</div>
				</div>
			{:else}
				<div class="wx-message">
					{@render children()}
					<div class="wx-comment-date">{dateFormatter(date)}</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.wx-bubble {
		width: 100%;
		display: flex;
		justify-content: end;
	}
	.wx-bubble.wx-owned {
		justify-content: start;
	}
	.wx-bubble-wrapper {
		width: 65%;
		display: flex;
		justify-content: end;
		gap: 8px;
	}
	.wx-owned .wx-bubble-wrapper {
		width: calc(65% + 28px);
		justify-content: start;
	}
	.wx-author-name {
		margin-left: auto;
	}
	.wx-owned .wx-author-name {
		margin-left: 0;
	}
	.wx-message {
		background-color: var(--wx-comments-msg-background);
		padding: 8px 12px;
		white-space: pre-wrap;
		line-height: 24px;
		border-radius: 6px 0 6px 6px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.wx-owned .wx-message {
		background-color: var(--wx-comments-msg-background-agent);
		border-radius: 0 6px 6px 6px;
		width: 100%;
	}
	.wx-author-name {
		font-weight: 600;
		font-size: 14px;
		line-height: 24px;
	}
	.wx-agent-message {
		display: flex;
		align-items: flex-end;
		gap: 4px;
		cursor: pointer;
	}
	.wx-menu-icon {
		opacity: 0;
		height: 24px;
		color: #9fa1ae;
		cursor: pointer;
		height: 100%;
	}
	.wx-menu-icon i {
		font-size: 24px;
		line-height: 24px;
	}
	.wx-menu-icon:hover {
		color: var(--wx-color-primary);
	}
	.wx-agent-message:hover .wx-menu-icon {
		opacity: 1;
		transition: all 0.2s linear;
	}
	.wx-main-bubble {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 100%;
	}
	.wx-avatar {
		height: 32px;
		width: 32px;
	}

	.wx-bubble:not(.wx-owned) .wx-bubble-wrapper {
		flex-direction: row-reverse;
	}

	.wx-comment-date {
		font-size: var(--wx-font-size-sm);
		color: var(--wx-color-font-alt);
		display: flex;
		flex-direction: row-reverse;
	}
</style>
