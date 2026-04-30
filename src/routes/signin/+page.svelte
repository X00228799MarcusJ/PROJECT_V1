<script>
	let email = "";
	let password = "";
	let message = "";

	async function login(e) {
		e.preventDefault();
		message = "";

		const cleanEmail = email.trim().toLowerCase();
		const cleanPassword = password.trim();

		if (!cleanEmail) return message = "enter email";
		if (!cleanPassword) return message = "enter password";

		// ✅ ADMIN LOGIN
		if (cleanEmail === "admin" && cleanPassword === "admin") {
			const adminUser = {
				id: 999,
				name: "admin",
				email: "admin",
				membership: "premium",
				isAdmin: true
			};

			localStorage.setItem("user", JSON.stringify(adminUser));
			window.location.assign("/admin");
			return;
		}

		try {
			const res = await fetch('http://localhost:3001/signin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
			});

			const data = await res.json();
			console.log("LOGIN:", data);

			if (data.success) {
				localStorage.setItem("user", JSON.stringify(data.user));
				window.location.assign("/user");
			} else {
				message = data.message;
			}

		} catch (err) {
			console.error(err);
			message = "server not reachable";
		}
	}
</script>

<h2>Sign in</h2>

<form on:submit|preventDefault={login}>
	<input bind:value={email} placeholder="email"><br><br>
	<input type="password" bind:value={password} placeholder="password"><br><br>

	<button type="submit">login</button>

	<button type="button" on:click={() => window.location.href = "/register"}>
		register
	</button>
</form>

<p>{message}</p>