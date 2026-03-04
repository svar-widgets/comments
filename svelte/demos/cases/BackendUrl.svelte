<script>
	import { RestURL } from "@svar-ui/lib-data-provider";
	import { Comments } from "../../src/index";

	import { getData } from "../data";
	const users = getData().users;

	const loadURL =
		"https://master--svar-comments-go--dev.webix.io/comments-info/1";
	const saveURL = new RestURL(
		"https://master--svar-comments-go--dev.webix.io/comments/1"
	);

	let value = $state([]);
	fetch(loadURL)
		.then(r => r.json())
		.then(d => (value = d));
</script>

<div style="margin: 20px; max-width: 700px; margin-top: 40px;">
	<Comments
		{value}
		onchange={({ action, comment, id }) =>
			saveURL.save(action, comment, id)}
		activeUser={users[0]}
	/>
</div>
