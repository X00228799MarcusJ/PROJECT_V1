<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';

	let email = "";
	let password = "";

	async function login(event) {
		event.preventDefault();

		const res = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		const data = await res.json();

		if (data.success) {
			// store user
			localStorage.setItem("user", JSON.stringify(data.user));

			// go to user page
			window.location.href = "/user";
		} else {
			alert("login failed");
		}
	}
</script>

<form class="m-3" on:submit={login}>
	<b>email address</b><br>
	<input type="text" bind:value={email} /><br><br>

	<b>password</b><br>
	<input type="password" bind:value={password} /><br><br>

	<button type="submit" class="btn btn-primary m-3">login</button>
	<button type="button" class="btn btn-primary m-3">forgot password</button>
	<a class="btn btn-primary" href="/register">register</a>
</form>