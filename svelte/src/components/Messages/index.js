import Bubbles from "./Bubbles.svelte";
import Flow from "./Flow.svelte";

import MarkdownPlain from "./MarkdownPlain.svelte";
import TextPlain from "./TextPlain.svelte";

export const messages = {
	bubbles: Bubbles,
	flow: Flow,
};
export const formats = {
	markdown: MarkdownPlain,
	text: TextPlain,
};
