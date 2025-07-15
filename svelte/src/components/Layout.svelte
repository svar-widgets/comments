<script>
	import { getContext, setContext, untrack } from "svelte";
	import Messages from "./Messages.svelte";
	import TextArea from "./TextArea.svelte";
	import { ActionMenu } from "wx-svelte-menu";
	import { uid } from "wx-lib-state";
	import { dateToString } from "wx-lib-dom";

	let {
		onaction,
		onchange,
		readonly = false,
		render = "flow",
		format = "text",
		users: rawUsers,
		data: rawData,
		activeUser,
		focus = false,
	} = $props();

	const lang = getContext("wx-i18n");
	const { calendar, comments, formats } = lang.getRaw();
	const _ = lang.getGroup("comments");

	const dateFormatter = dateToString(
		comments.dateFormat || formats.dateFormat,
		calendar
	);
	setContext("wx-comments-format", {
		dateStr: date => dateFormatter(date),
	});

	let edit = $state(null);
	let value = $state("");

	$effect(() => {
		rawData;
		untrack(() => {
			// Clear editing state when rawData is updated
			value = "";
			edit = null;
		});
	});

	const unknownUser = { id: 0, name: _("Unknown"), color: "hsl(0, 0%, 85%)" };

	const users = $derived.by(() => {
		if (!rawUsers) return [];
		return rawUsers.map(u => {
			if (!u.color)
				return {
					...u,
					color: "hsl(" + getColor(u.id + u.name) + ", 100%, 85%)",
				};
			return u;
		});
	});

	const author = $derived.by(() => {
		if (typeof activeUser === "object") return activeUser;
		const a = users.find(u => u.id === activeUser) || unknownUser;
		if (a) return a;
		return {
			id: activeUser || -1,
			name: _("Me"),
			color: "hsl(225, 76%, 67%)",
		};
	});

	const data = $derived.by(() => {
		if (!rawData) return [];

		// data with user objects
		return rawData.map(d => {
			if (typeof d.author === "object") return d;

			const user = users ? users.find(u => u.id === d.user) : null;
			return {
				...d,
				author: user || unknownUser,
			};
		});
	});

	function getColor(name) {
		let hash = 0;
		for (let i = 0; i < name.length; i++) {
			// eslint-disable-next-line no-bitwise
			hash = name.charCodeAt(i) + ((hash << 5) - hash);
		}
		return (hash % 60) * 6;
	}

	function add(content) {
		const comment = {
			id: uid(),
			content,
			author,
			user: author.id,
			date: new Date(),
		};

		rawData = [...data, comment];
		if (onchange) {
			const res = onchange({ value: rawData, comment, action: "add" });
			if (res && typeof res === "object") {
				if (res.then) {
					res.then(data => {
						updateAfter(comment.id, data);
					});
				} else {
					updateAfter(comment.id, res);
				}
			}
		}
	}

	function updateAfter(id, data) {
		const index = rawData.findIndex(d => d.id === id);

		const copy = [...rawData];
		copy[index] = { ...rawData[index], ...data };
		rawData = copy;
	}

	function remove(id) {
		rawData = rawData.filter(d => d.id !== id);
		onchange && onchange({ value: rawData, id, action: "delete" });
	}

	function update(id, content) {
		let comment;
		rawData = rawData.map(d => {
			if (d.id === id) {
				comment = { ...d, content };
				return comment;
			} else return d;
		});

		onchange && onchange({ value: rawData, id, action: "update", comment });
	}

	function cancelUpdate() {
		edit = null;
	}

	function handleActionMenu(ev) {
		const { context, action } = ev;

		if (!action) return;

		onaction && onaction({ action: "menu-clicked" });

		switch (action.id) {
			case "edit-comment":
				edit = context;
				break;
			case "delete-comment":
				remove(context);
				break;
		}
	}

	const menuItems = [
		{
			id: "edit-comment",
			text: _("Edit"),
			icon: "wxi-edit-outline",
		},
		{
			id: "delete-comment",
			text: _("Delete"),
			icon: "wxi-delete-outline",
		},
	];

	let menu = $state(null);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="wx-comments-list">
	<ActionMenu
		at={"bottom"}
		bind:this={menu}
		options={menuItems}
		resolver={item => item}
		dataKey="commentMenuId"
		onclick={handleActionMenu}
	/>
	<div class="wx-list" onclick={menu.show}>
		<Messages
			{author}
			{render}
			{data}
			{format}
			{edit}
			onpost={ev => update(edit, ev.value)}
			oncancel={cancelUpdate}
		></Messages>
	</div>
	{#if !readonly && !edit}
		<TextArea
			{author}
			flow={render === "flow"}
			{focus}
			onpost={ev => add(ev.value)}
			buttonLabel={"Add"}
			bind:value
		/>
	{/if}
</div>

<style>
	.wx-comments-list {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.wx-list {
		display: flex;
		flex-direction: column;
		margin-bottom: 4px;
		overflow-y: auto;
		flex: 1;
	}
</style>
