'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface ThemeSwitchProps {
	className?: string;
}

export default function ThemeSwitch({ className }: ThemeSwitchProps) {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<label
			className={cn(
				'inline-flex cursor-pointer items-center gap-1',
				className
			)}
			htmlFor="theme-switch"
		>
			<FiSun />
			{mounted ? (
				<Switch
					checked={resolvedTheme === 'dark'}
					id="theme-switch"
					onCheckedChange={() =>
						setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
					}
				/>
			) : (
				<div className="h-4.5 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
			)}
			<FiMoon />
		</label>
	);
}
