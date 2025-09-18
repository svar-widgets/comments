import BasicInit from "./cases/BasicInit.svelte";
import MarkdownInit from "./cases/MarkdownInit.svelte";
import CustomContent from "./cases/CustomContent.svelte";
import Events from "./cases/Events.svelte";
import Locale from "./cases/Locale.svelte";
import BackendUrl from "./cases/BackendUrl.svelte";
import CustomBackend from "./cases/CustomBackend.svelte";
import BackendResolve from "./cases/BackendResolve.svelte";

export const links = [
	["/base/:skin", "Comments basic", BasicInit, "BasicInit"],
	["/markdown/:skin", "Markdown content", MarkdownInit, "MarkdownInit"],
	["/custom-render/:skin", "Custom content", CustomContent, "CustomContent"],
	["/events/:skin", "Events", Events, "Events"],
	["/locale/:skin", "Locales", Locale, "Locale"],
	["/backend-url/:skin", "Save to backend", BackendUrl, "BackendUrl"],
	["/backend-custom/:skin", "Custom backend", CustomBackend, "CustomBackend"],
	[
		"/data-resolve/:skin",
		"Resolve and fetch",
		BackendResolve,
		"BackendResolve",
	],
];
