<script>
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';
	import 'bootstrap/dist/css/bootstrap.min.css'
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="navbar navbar-expand-md navbar-dark bd-navbar bg-dark">
  <nav class="container-xl flex-wrap flex-md-nowrap" aria-label="Main navigation">
		<div class="container-fluid main-wrapper">
			<a class="navbar-brand" href="/">
				<i class="bi bi-heart-pulse-fill me-2"></i>Project V1
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav me-auto">
					<li class="nav-item">
						<a class="nav-link" href="/"><i class="bi bi-house-door-fill me-1"></i>Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/signin"><i class="bi bi-person-fill me-1"></i>Sign In</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/subscriptions"><i class="bi bi-cart-fill me-1"></i>Subscriptions</a>	
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/about"><i class="bi bi-info-square-fill me-1"></i>About</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>


<footer class="navbar navbar-expand-md navbar-dark bd-navbar bg-dark fixed-bottom">
  <nav class="container-xl flex-wrap flex-md-nowrap" aria-label="Main navigation">
		<div class="container-fluid main-wrapper">
			<a class="navbar-brand" href="/">
				Contact Us
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav flex-column me-auto">
					<li class="nav-item">
						<a class="nav-link" href="https://youtube.com"><i class="bi bi-youtube me-1"></i>Youtube</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="https://x.com"><i class="bi bi-twitter me-1"></i>X</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="https://instagram.com"><i class="bi bi-instagram me-1"></i>Instagram</a>
					</li>
				</ul>
				<ul class="navbar-nav flex-column">
    				<li class="nav-item">
      					<span class="nav-link"><i class="bi bi-phone-fill me-1"></i>Phone: 087 235 3757</span>
    				</li>
    				<li class="nav-item">
      					<span class="nav-link"><i class="bi bi-envelope-fill me-1"></i>Email: X00228799@MyTuDublin.ie</span>
    				</li>
  				</ul>
			</div>
		</div>
	</nav>
</footer>
<div class="container-xl bd-gutter my-md-4 bd-layout">
  {@render children()}
</div>