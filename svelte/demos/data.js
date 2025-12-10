export function getData(n) {
	let data = [
		{
			id: 1,
			user: 1,
			content:
				"Greetings, fellow colleagues. I would like to share my insights on this task. I reckon we should deal with at least half of the points in the plan without further delays.",
			date: new Date(2024, 0, 15, 10, 30, 0),
		},
		{
			id: 2,
			user: 2,
			content:
				"Hi, Alice. I am sure that that's exactly what is thought best out there in Dunwall. Let's just do what we are supposed to do to get the result.",
			date: new Date(2024, 0, 15, 11, 45, 0),
		},
		{
			id: 3,
			user: 3,
			content:
				"Absolutely, Alice. Action speaks louder than words, and in this case, it's about executing the plan efficiently. Let's prioritize tasks and tackle them head-on.",
			date: new Date(2024, 0, 15, 14, 20, 0),
		},
	];

	if (n) {
		let temp = data;
		data = [];
		const round = Math.ceil(n / temp.length);
		for (let i = 0; i < round; i++) {
			data = data.concat(temp);
		}
		data = data.slice(0, n);

		data.forEach((comment, index) => {
			data[index] = { ...comment, id: index + 1 };
		});
	}

	const users = [
		{
			id: 1,
			name: "Alice Smith",
			avatar: "https://svar.dev/demos/grid/assets/avatars/Alice_Smith.png",
		},
		{
			id: 2,
			name: "Robert Williams",
			avatar: "https://svar.dev/demos/grid/assets/avatars/Robert_Williams.png",
		},
		{
			id: 3,
			name: "Daniel Clark",
			avatar: "https://svar.dev/demos/grid/assets/avatars/Daniel_Clark.png",
		},
		{
			id: 4,
			name: "Marta Kowalska",
			color: "#e23a43",
		},
	];

	return {
		data,
		users,
	};
}

export function getMarkdownData(n) {
	let data = [
		{
			id: 1,
			user: 1,
			content: `### Greetings
				
I would like to share my **insights** on this task. I reckon we should deal with at least half of the points in the plan without further delays.`,
			date: new Date(2024, 0, 15, 10, 30, 0),
		},
		{
			id: 2,
			user: 2,
			content:
				"Hi, **Laura**. I am sure that that's *exactly what is thought best out there* in Dunwall. Let's just do what we are supposed to do to get the result.",
			date: new Date(2024, 0, 15, 11, 45, 0),
		},
	];

	if (n) {
		let temp = data;
		data = [];
		const round = Math.ceil(n / temp.length);
		for (let i = 0; i < round; i++) {
			data = data.concat(temp);
		}
		data = data.slice(0, n);

		data.forEach((comment, index) => {
			data[index] = { ...comment, id: index + 1 };
		});
	}

	const users = [
		{
			id: 1,
			name: "Laura Turner",
			avatar: "https://svar.dev/demos/grid/assets/avatars/Laura_Turner.png",
		},
		{
			id: 2,
			name: "John Doe",
			avatar: "https://svar.dev/demos/grid/assets/avatars/John_Doe.png",
		},
		{
			id: 3,
			name: "Robert Williams",
			avatar: "https://svar.dev/demos/grid/assets/avatars/Robert_Williams.png",
		},
		{
			id: 4,
			name: "Mary Johnson",
			avatar: "https://svar.dev/demos/grid/assets/avatars/Mary_Johnson.png",
		},
	];

	return {
		data,
		users,
	};
}
