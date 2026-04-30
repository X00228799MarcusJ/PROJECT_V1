<script>
	let user = JSON.parse(localStorage.getItem("user"));
</script>

{#if user}
	<h2>Welcome {user.username}</h2>

	<button on:click={() => {
		localStorage.removeItem("user");
		window.location.href = "/";
	}}>
		Logout
	</button>
{:else}
	<p>Not logged in</p>
{/if}