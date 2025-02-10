import BasicInit from "./cases/BasicInit.svelte";
import MarkdownInit from "./cases/MarkdownInit.svelte";
import Events from "./cases/Events.svelte";
import Locale from "./cases/Locale.svelte";
import BackendUrl from "./cases/BackendUrl.svelte";
import CustomBackend from "./cases/CustomBackend.svelte";
import BackendResolve from "./cases/BackendResolve.svelte";

export const links = [
	["/base/:skin", "Comments basic", BasicInit],
	["/markdown/:skin", "Markdown content", MarkdownInit],
	["/events/:skin", "Events", Events],
	["/locale/:skin", "Localization", Locale],
	["/backend-url/:skin", "Save to Backend", BackendUrl],
	["/backend-custom/:skin", "Custom Backend", CustomBackend],
	["/data-resolve/:skin", "Resolve and Fetch", BackendResolve],
];
