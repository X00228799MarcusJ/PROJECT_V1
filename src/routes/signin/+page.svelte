<<<<<<< HEAD
<script>
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';
	import 'bootstrap/dist/css/bootstrap.min.css'
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import { preventDefault } from 'svelte/legacy';

	let { email, password } = $props();



	function login(event) {
	event.preventDefault

	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;

	}
</script>




<form class="m-3">
	<b>email address</b><br>
	<input type="text" bind:value={email} /><br><br>
	<b>password</b><br>
	<input type="text" bind:value={password} /><br><br>
	<button class="btn btn-primary m-3" onclick={login}>login</button>
	<button class="btn btn-primary m-3">forgot password</button>
	
=======
<script>
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';
	import 'bootstrap/dist/css/bootstrap.min.css'
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import { preventDefault } from 'svelte/legacy';

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
		console.log(data);

		if (data.success) {
			alert("login successful");
		} else {
			alert("login failed");
		}

	}
</script>




<form class="m-3">
	<b>email address</b><br>
	<input type="text" bind:value={email} /><br><br>
	<b>password</b><br>
	<input type="text" bind:value={password} /><br><br>
	<button class="btn btn-primary m-3" onclick={login}>login</button>
	<button class="btn btn-primary m-3">forgot password</button>
	<a class="btn btn-primary" href="/register">register</a>
	
>>>>>>> 23ee867 (reigister 2)
</form>