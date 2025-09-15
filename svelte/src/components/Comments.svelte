<script>
	import Layout from "./Layout.svelte";
	import { Locale } from "@svar-ui/svelte-core";
	import { en } from "@svar-ui/comments-locales";
	import { en as coreEn } from "@svar-ui/core-locales";

	const { ondata, onchange, value, ...props } = $props();
	const finalData = $derived(ondata && value ? ondata(value) : value);

	const handleOnchange = e => {
		e.originalValue = value;
		return onchange && onchange(e);
	};
</script>

<Locale words={{ ...coreEn, ...en }} optional={true}>
	{#await finalData}
		<Layout data={[]} {...props} onchange={handleOnchange} />
	{:then data}
		<Layout {data} {...props} onchange={handleOnchange} />
	{/await}
</Locale>
