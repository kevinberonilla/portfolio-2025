'use client';

import { useRouter } from 'next/navigation';
import CallsToAction, { CallToAction } from '@/components/CallsToAction';
import Logo from '@/components/Logo';
import ThemeSwitch from '@/components/ThemeSwitch';
import { cn } from '@/lib/utils';

interface LogoProps {
	buttons: CallToAction[];
	className?: string;
	hideCtaButtons?: boolean;
	onLogoClick?: () => void;
}

export default function Header({
	buttons,
	className,
	hideCtaButtons = false,
	onLogoClick,
}: LogoProps) {
	const router = useRouter();

	return (
		<header
			className={cn(
				'bg-background flex w-full items-center justify-between gap-6 p-8',
				className
			)}
		>
			<Logo
				className="text-foreground h-6 w-auto cursor-pointer sm:h-7"
				onClick={onLogoClick ?? (() => router.push('/'))}
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
