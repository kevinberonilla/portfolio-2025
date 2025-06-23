'use client';

import CallsToAction, { CallToAction } from '@/components/CallsToAction';
import Logo from '@/components/Logo';
import ThemeSwitch from '@/components/ThemeSwitch';
import { cn } from '@/lib/utils';

interface LogoProps {
	buttons: CallToAction[];
	hideCtaButtons: boolean;
	onLogoClick: () => void;
}

export default function Header({
	buttons,
	hideCtaButtons,
	onLogoClick,
}: LogoProps) {
	return (
		<header className="bg-background sticky top-0 z-20 flex w-full items-center justify-between gap-6 p-8">
			<Logo
				className="text-foreground h-6 w-auto cursor-pointer sm:h-7"
				onClick={onLogoClick}
			/>
			<div className="flex items-center gap-2 sm:gap-6">
				<CallsToAction
					buttons={buttons}
					className={cn(
						'pointer-events-none gap-1 overflow-hidden p-1 *:translate-y-full *:opacity-0 *:transition-all *:duration-200 sm:gap-2',
						!hideCtaButtons &&
							'pointer-events-auto *:translate-y-0 *:opacity-100'
					)}
					header
				/>
				<ThemeSwitch />
			</div>
		</header>
	);
}
