<script>
	import { onMount } from 'svelte';

	let user = null;

	onMount(() => {
		const stored = localStorage.getItem("user");

		if (!stored) {
			window.location.href = "/signin";
			return;
		}

		try {
			user = JSON.parse(stored);
		} catch {
			localStorage.removeItem("user");
			window.location.href = "/signin";
		}
	});

	function logout() {
		localStorage.removeItem("user");
		window.location.href = "/signin";
	}
</script>

{#if user}
	<h2>Welcome {user.name}</h2>
	<p>your email is: {user.email}</p>
	<p>Current Membership: {user.membership}</p>

	<button on:click={logout}>logout</button>
{:else}
	<p>loading...</p>
{/if}