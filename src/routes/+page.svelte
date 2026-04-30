<script>
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';
	import 'bootstrap/dist/css/bootstrap.min.css'
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	let { children } = $props();
</script>
<div class="homesec1 mt-4">
    <div class="row align-items-center">
        <div class="col-md-8">
            <img src="/src/lib/assets/img1.png" alt="img1" class="img-fluid rounded">
        </div>
        <div class="col-md-3">
            <h2><strong>Why choose us?</strong></h2>
            <p>We guarantee both top of the line equipment and high level professional training services.</p>
            <p>Not convinced? Just have a look at our testimonies.</p>
            <a href="/subscriptions" class="btn btn-success mt-3 ms-5">Join Now!</a>
        </div>
    </div>
</div>
<div class="testimonies">
    <div class="row text-center mt-4">
        <div class="col-md-4">
            <h4>John Doe</h4>
            <p class="text-muted"><em>Gym member for over 10 years.</em></p>
            <p>"Staff is always friendly and helpful."</p>
        </div>
        <div class="col-md-4">
            <h4>Ryan Smith</h4>
            <p class="text-muted"><em>Fitness influencer since 2019.</em></p>
            <p>"Top tier personal training services."</p>
        </div>
        <div class="col-md-4">
            <h4>Robert Johnson</h4>
            <p class="text-muted"><em>Retired personal trainer.</em></p>
            <p>"Excellent equipment selection and very professional staff."</p>
        </div>
    </div>
</div>