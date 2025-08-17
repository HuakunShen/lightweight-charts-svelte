<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { page } from '$app/state';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import {
		Sidebar,
		SidebarContent,
		SidebarFooter,
		SidebarGroup,
		SidebarGroupContent,
		SidebarGroupLabel,
		SidebarHeader,
		SidebarInset,
		SidebarMenu,
		SidebarMenuButton,
		SidebarMenuItem,
		SidebarProvider,
		SidebarTrigger
	} from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';

	let { children } = $props();

	const navigation = [
		{ href: '/', label: 'Home', icon: '🏠' },
		{ href: '/bar', label: 'Bar Chart', icon: '📊' },
		{ href: '/histogram', label: 'Histogram', icon: '📈' },
		{ href: '/curve', label: 'Yield Curve', icon: '📉' },
		{ href: '/panes', label: 'Multiple Panes', icon: '🔲' },
		{ href: '/price-scale', label: 'Price Scale', icon: '📏' },
		{ href: '/time-scale', label: 'Time Scale', icon: '⏱️' },
		{ href: '/legends', label: 'Legends', icon: '🏷️' },
		{ href: '/markers', label: 'Markers', icon: '📍' }
	];
</script>

<ModeWatcher />
<Toaster />

<SidebarProvider>
	<Sidebar>
		<SidebarHeader>
			<div class="flex items-center space-x-2 px-2 py-2">
				<div class="flex items-center space-x-2">
					<span class="text-lg">📈</span>
					<div>
						<h2 class="text-lg font-semibold">Lightweight Charts</h2>
						<div class="flex items-center space-x-1">
							<span class="text-xs text-muted-foreground">Svelte 5</span>
							<Badge variant="secondary" class="h-4 text-xs">v5</Badge>
						</div>
					</div>
				</div>
			</div>
		</SidebarHeader>

		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>Chart Examples</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{#each navigation as item}
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href={item.href} class={page.url.pathname === item.href ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}>
										<span class="mr-2">{item.icon}</span>
										{item.label}
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						{/each}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>

		<SidebarFooter>
			<div class="px-2 py-2">
				<div class="text-xs text-muted-foreground">
					<div class="mb-1">Built with Svelte 5</div>
					<div>
						<a 
							href="https://tradingview.github.io/lightweight-charts/" 
							class="text-blue-600 hover:text-blue-700"
							target="_blank"
							rel="noopener noreferrer"
						>
							TradingView Charts
						</a>
					</div>
				</div>
			</div>
		</SidebarFooter>
	</Sidebar>

	<SidebarInset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b">
			<div class="flex items-center gap-2 px-3">
				<SidebarTrigger />
				<div class="h-4 w-px bg-sidebar-border"></div>
				<div class="flex items-center space-x-2">
					<h1 class="text-lg font-semibold">
						{navigation.find(item => item.href === page.url.pathname)?.label || 'Svelte Lightweight Charts'}
					</h1>
				</div>
			</div>
		</header>

		<main class="flex-1 overflow-auto">
			{@render children()}
		</main>
	</SidebarInset>
</SidebarProvider>
