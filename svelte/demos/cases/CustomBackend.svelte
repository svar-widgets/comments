<script>
	import { Comments } from "../../src/index";
	import { getData } from "../data";

	const stub = getData();
	const users = stub.users;

	let prev = localStorage.getItem("--comments-demo-data");
	let data = prev ? JSON.parse(prev) : stub.data;
	let message = $state("");

	function callback(action, obj) {
		switch (action) {
			case "add": {
				message = `The message "${obj.comment.content}" was successfully added`;
				break;
			}
			case "delete": {
				message = `The message was successfully deleted`;
				break;
			}
			case "update": {
				message = `The message was successfully updated`;
				break;
			}
		}
		localStorage.setItem("--comments-demo-data", JSON.stringify(obj.value));
	}
</script>

<div class="message">{message}</div>
<div>
	<div class="comments">
		<Comments
			value={data}
			onchange={e => callback(e.action, e)}
			{users}
			activeUser={1}
		/>
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
	.comments {
		margin: 20px auto;
		max-width: 768px;
		height: calc(100% - 56px);
	}
</style>
