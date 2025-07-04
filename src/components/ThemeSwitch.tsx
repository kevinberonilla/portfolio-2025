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
			{mounted && !!resolvedTheme ? (
				<Switch
					aria-label="Toggle Theme"
					checked={resolvedTheme === 'dark'}
					className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary cursor-pointer"
					id="theme-switch"
					onCheckedChange={() =>
						setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
					}
				/>
			) : (
				<div className="bg-primary/20 h-4.5 w-8 rounded-full" />
			)}
			<FiMoon />
		</label>
	);
}
