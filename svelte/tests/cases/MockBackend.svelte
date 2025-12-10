<script>
	import { Segmented } from "@svar-ui/svelte-core";
	import { Comments } from "../../src/index";
	import { getData } from "../../demos/data";

	const users = getData().users;

	const mockData = {
		1: [
			{
				id: 1,
				user: 1,
				content:
					"Greetings, fellow colleagues. I would like to share my insights on this task.",
				date: new Date(2024, 0, 15, 10, 30, 0),
			},
			{
				id: 2,
				user: 2,
				content:
					"Hi, Alice. I am sure that that's exactly what is thought best out there in Dunwall.",
				date: new Date(2024, 0, 15, 11, 45, 0),
			},
			{
				id: 3,
				user: 3,
				content:
					"Absolutely, Alice. Action speaks louder than words, and in this case, it's about executing the plan efficiently.",
				date: new Date(2024, 0, 15, 14, 20, 0),
			},
		],
		2: [
			{
				id: 4,
				user: 2,
				content: "This is page 2 content. Different data for testing.",
				date: new Date(2024, 0, 16, 9, 15, 0),
			},
			{
				id: 5,
				user: 3,
				content: "Page 2 second comment for validation.",
				date: new Date(2024, 0, 16, 10, 30, 0),
			},
		],
	};

	let nextId = 10;
	let pageId = $state(1);

	const options = [
		{ id: 1, label: "Page 1" },
		{ id: 2, label: "Page 2" },
	];

	async function fetchData(page) {
		await new Promise(resolve => setTimeout(resolve, 300));
		return [...mockData[page]];
	}

	async function saveData({ action, comment, id, originalValue: page }) {
		await new Promise(resolve => setTimeout(resolve, 200));

		switch (action) {
			case "add": {
				const newComment = {
					...comment,
					id: nextId++,
					date: new Date(2024, 0, 20, 12, 0, 0),
				};
				mockData[page] = [...mockData[page], newComment];
				break;
			}

			case "update": {
				const updateIndex = mockData[page].findIndex(c => c.id === id);
				if (updateIndex !== -1) {
					mockData[page][updateIndex] = { ...comment, id };
				}
				break;
			}

			case "delete": {
				mockData[page] = mockData[page].filter(c => c.id !== id);
				break;
			}
		}
	}
</script>

<div>
	<div class="toolbar">
		<Segmented bind:value={pageId} {options} />
	</div>
	<div class="comments">
		<Comments
			value={pageId}
			ondata={fetchData}
			onchange={saveData}
			activeUser={1}
			{users}
		/>
	</div>
</div>

<style>
	.toolbar {
		height: 56px;
		padding: 12px;
	}
	.comments {
		margin: 20px auto;
		max-width: 768px;
		height: calc(100% - 56px);
	}
</style>
