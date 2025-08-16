<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<header>
	<a class="underline" href="/">Home</a>
	<a class="underline" href="/bar">Bar Chart</a>
	<a class="underline" href="/histogram">Histogram</a>
	<a class="underline" href="/curve">Yield Curve</a>
</header>
{@render children()}
