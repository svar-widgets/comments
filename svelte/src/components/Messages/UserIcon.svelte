<script>
	import { getContrastingColor } from "../../helpers/colors";

	const {
		data = {
			name: "",
			avatar: "",
			color: "",
		},
		noTransform = false,
		size = "small",
		border = true,
	} = $props();

	const firstLetters = $derived(data.name
		.split(" ")
		.map(name => name[0])
		.join(""));

	let style = $derived(data.color ? `background: ${data.color};` : "");
	let css = $derived(data.color ? `wx-comments-avatar-color-${getContrastingColor(data.color)}` : "");
</script>

<div class="wx-user wx-{size} {css}" class:wx-border={border} {style}>
	{#if data.avatar}
		<img src={data.avatar} alt={data.name} />
	{:else if noTransform}{data.name}{:else}{firstLetters}{/if}
</div>

<style>
	.wx-user {
		--wx-comments-user-icon-size: 36px;

		font-size: 12px;
		font-weight: 500;
		line-height: 12px;
		border-radius: 50%;
		color: var(--wx-color-font);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		background-color: #ca9cec;
		color: var(--wx-color-font);
	}

	.wx-user.wx-normal {
		width: var(--wx-comments-user-icon-size);
		height: var(--wx-comments-user-icon-size);
		font-size: var(--wx-font-size);
	}

	.wx-user.wx-small {
		width: 24px;
		height: 24px;
		font-size: var(--wx-font-size-sm);
	}

	.wx-user img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.wx-user:not(:first-child) {
		margin-left: -15px;
	}

	.wx-user.wx-comments-avatar-color-light {
		color: var(--wx-color-primary-font);
	}

	.wx-user.wx-comments-avatar-color-dark {
		color: var(--wx-avatar-color-dark);
	}
</style>
