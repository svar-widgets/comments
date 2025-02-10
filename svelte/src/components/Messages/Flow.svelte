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

<div class="wx-flow" class:owned>
	<div class="wx-flow-toolbar">
		<UserIcon data={author} />
		<span class="wx-author-name">{author.name}</span>
		{#if owned && owned !== edit}
			<div class="wx-menu-icon" data-comment-menu-id={owned}>
				<i class="wx-icon wxi-dots-v" ></i>
			</div>
		{/if}
	</div>
	<div class="wx-comment-date">{dateFormatter(date)}</div>
	<div class="wx-message">
		{@render children()}
	</div>
</div>

<style>
	.wx-flow {
		width: 100%;
		padding: 16px 20px;
		border-radius: 6px;
	}
	.wx-flow.owned {
		background-color: var(--wx-comments-msg-background-agent);
	}
	.wx-flow:hover .wx-menu-icon {
		opacity: 1;
		transition: all 0.2s linear;
	}
	.wx-flow-toolbar {
		width: 100%;
		display: flex;
		gap: 8px;
	}
	.wx-message {
		margin-left: 32px;
		line-height: 24px;
		white-space: pre-wrap;
	}
	.wx-author-name {
		font-weight: 600;
		font-size: 14px;
		line-height: 24px;
	}
	.wx-menu-icon {
		color: #9fa1ae;
		cursor: pointer;
		margin-left: auto;
		opacity: 0;
		height: 24px;
	}
	.wx-menu-icon:hover {
		color: var(--wx-color-primary);
	}
	.wx-menu-icon i {
		font-size: 24px;
		line-height: 24px;
	}
	.wx-comment-date {
		margin-left: 32px;
		font-size: var(--wx-font-size-sm);
		color: var(--wx-color-font-alt);
	}
</style>
