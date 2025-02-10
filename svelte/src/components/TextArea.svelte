<script>
	import { onMount, getContext } from "svelte";
	import { TextArea, Button } from "wx-svelte-core";
	import UserIcon from "./Messages/UserIcon.svelte";

	let {
		focus = false,
		buttonLabel = "Send",
		flow = false,
		value = $bindable(""),
		author,
		onpost,
	} = $props();

	let textarea, area;

	const _ = getContext("wx-i18n").getGroup("comments");

	onMount(() => {
		area = textarea.querySelector("textarea");
		if (focus) area.focus();
		area.onkeydown = ev => {
			if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) {
				ev.preventDefault();
				onclick();
			}
		};
	});

	function onclick() {
		if (!value) return;
		onpost && onpost({ value });
		value = "";
		area.focus();
	}
</script>

<div
	class="wx-comments-textarea"
	class:wx-flow={flow}
	data-focus="yes"
	bind:this={textarea}
>
	<div class="wx-textarea-wrapper">
		{#if author}
			<div class="wx-textarea-avatar">
				<UserIcon data={author} />
			</div>
		{/if}
		<TextArea placeholder={_("Add a comment...")} bind:value />
	</div>
	<div class="wx-textarea-bottombar">
		<Button type="primary" {onclick}>{buttonLabel}</Button>
	</div>
</div>

<style>
	.wx-comments-textarea {
		width: 100%;
		background-color: inherit;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.wx-textarea-wrapper {
		position: relative;
		display: flex;
		gap: 8px;
	}
	.wx-comments-textarea.wx-flow .wx-textarea-avatar {
		margin-left: 20px;
	}
	.wx-textarea-bottombar {
		text-align: right;
	}
	.wx-textarea-bottombar :global(button) {
		padding: 6px 16px;
		font-weight: 600;
		line-height: 20px;
	}
</style>
