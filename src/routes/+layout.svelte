<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();

	const navigation = [
		{ href: '/', label: 'Home', icon: '🏠' },
		{ href: '/bar', label: 'Bar Chart', icon: '📊' },
		{ href: '/histogram', label: 'Histogram', icon: '📈' },
		{ href: '/curve', label: 'Yield Curve', icon: '📉' },
		{ href: '/panes', label: 'Multiple Panes', icon: '🔲' }
	];
</script>

<div class="min-h-screen bg-gray-50">
	<header class="bg-white shadow-sm border-b border-gray-200">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center space-x-2">
					<h1 class="text-xl font-bold text-gray-900">Svelte Lightweight Charts</h1>
					<span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">v5</span>
				</div>
				<nav class="hidden md:flex space-x-1">
					{#each navigation as item}
						<a
							href={item.href}
							class="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
								{$page.url.pathname === item.href 
									? 'bg-blue-100 text-blue-700' 
									: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}"
						>
							<span>{item.icon}</span>
							<span>{item.label}</span>
						</a>
					{/each}
				</nav>
				<div class="md:hidden">
					<button class="text-gray-600 hover:text-gray-900 p-2" aria-label="Open navigation menu">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="bg-white border-t border-gray-200 mt-12">
		<div class="container mx-auto px-4 py-6">
			<div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
				<div class="text-sm text-gray-600">
					Built with <a href="https://svelte.dev" class="text-blue-600 hover:text-blue-700 font-medium">Svelte 5</a> 
					and <a href="https://tradingview.github.io/lightweight-charts/" class="text-blue-600 hover:text-blue-700 font-medium">TradingView Lightweight Charts</a>
				</div>
				<div class="flex space-x-4 text-sm">
					<a href="https://github.com" class="text-gray-600 hover:text-gray-900">GitHub</a>
					<a href="https://tradingview.github.io/lightweight-charts/docs" class="text-gray-600 hover:text-gray-900">Documentation</a>
				</div>
			</div>
		</div>
	</footer>
</div>
