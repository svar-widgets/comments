<script>
	import TextArea from "../TextArea.svelte";
	import { messages, formats } from "./index.js";

	const {
		content,
		date,
		owned,
		render,
		format = "text",
		author,
		edit,
		onpost,
		oncancel,
	} = $props();

	const BoxRender = typeof render === "string" ? messages[render] : render;
	const TextRender = typeof format === "string" ? formats[format] : format;
</script>

<BoxRender {owned} {edit} {author} {date}>
	{#if edit && edit === owned}
		<TextArea focus={true} {onpost} {oncancel} value={content} />
	{:else}
		<TextRender {content} />
	{/if}
</BoxRender>
