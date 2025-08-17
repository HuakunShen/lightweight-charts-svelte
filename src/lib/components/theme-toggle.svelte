<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import { SidebarMenuButton } from '$lib/components/ui/sidebar/index.js';
</script>

<SidebarMenuButton 
	class="w-full justify-start"
	onclick={toggleMode}
>
	<SunIcon
		class="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
	/>
	<MoonIcon
		class="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
	/>
	<span class="ml-2">Toggle Theme</span>
</SidebarMenuButton>
