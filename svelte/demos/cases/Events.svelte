<script>
	import { Comments } from "../../src/index";
	import { getData } from "../data";

	const { data, users } = getData();

	let message = $state("");
	function trackChanges({ action, id, comment }) {
		switch (action) {
			case "add":
				message = `New comment was added (${new Date().getTime()})`;
				console.log(`New comment: "${comment.content}" was added `);
				break;
			case "update":
				message = `Comment with id: ${id} was updated`;
				console.log(`Comment with id: ${id} was updated `);
				break;
			case "delete":
				message = `Comment with id: ${id} was deleted`;
				console.log(`Comment with id: ${id} was deleted `);
				break;
		}
	}
</script>

<div class="message">{message}</div>
<div>
	<div class="wrapper">
		<Comments value={data} {users} activeUser={1} onchange={trackChanges} />
	</div>
</div>

<style>
	.message {
		padding: 5px 10px;
		background-color: #eee;
		color: #444;
		line-height: 33px;
		height: 40px;
	}
	.wrapper {
		margin: 20px auto;
		max-width: 768px;
		height: 100%;
	}
</style>
