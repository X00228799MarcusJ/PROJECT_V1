<script>
	let name = "";
	let email = "";
	let password = "";
	let message = "";

	async function register(e) {
		e.preventDefault();

		if (!password || password.trim() === "") {
			message = "enter a password";
			return;
		}

		const res = await fetch("http://localhost:3001/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password })
		});

		const data = await res.json();

		message = data.message;

		if (data.success) {
			setTimeout(() => {
				window.location.href = "/signin";
			}, 1000);
		}
	}
</script>

<h2>Register</h2>

<form on:submit={register}>
	<input placeholder="name" bind:value={name} />
	<input placeholder="email" bind:value={email} />
	<input type="password" placeholder="password" bind:value={password} />
	<button>make account</button>
</form>

<p>{message}</p>