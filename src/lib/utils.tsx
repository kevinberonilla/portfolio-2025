import { clsx, type ClassValue } from 'clsx';
import { FiFileText, FiGithub, FiLinkedin } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { CallToAction } from '@/components/CallsToAction';

export const bgGradient =
	'bg-gray-600 bg-gradient-to-br from-blue-200/20 to-rose-400/10 dark:bg-slate-950/30 dark:from-stone-900/30 dark:to-orange-800/20';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getCtaButtons(header = false): CallToAction[] {
	return [
		{
			ariaLabel: 'View my resume',
			className: cn(
				'bg-amber-600 hover:bg-amber-700',
				header && 'max-sm:size-6.5'
			),
			href: '/downloads/kevin-beronilla-resume.pdf',
			icon: (
				<FiFileText
					className={cn(
						'drop-shadow-xs drop-shadow-black/60',
						header && 'size-3'
					)}
				/>
			),
			label: 'Resume',
		},
		{
			ariaLabel: 'View my LinkedIn profile',
			className: cn(
				'bg-sky-700 hover:bg-sky-800',
				header && 'max-sm:size-6.5'
			),
			href: 'https://www.linkedin.com/in/kevinberonilla',
			icon: (
				<FiLinkedin
					className={cn(
						'drop-shadow-xs drop-shadow-black/60',
						header && 'size-3'
					)}
				/>
			),
			label: 'LinkedIn',
		},
		{
			ariaLabel: 'View my GitHub profile',
			className: cn(
				'bg-zinc-700 hover:bg-zinc-800',
				header && 'max-sm:size-6.5'
			),
			href: 'https://github.com/kevinberonilla',
			icon: (
				<FiGithub
					className={cn(
						'drop-shadow-xs drop-shadow-black/60',
						header && 'size-3'
					)}
				/>
			),
			label: 'GitHub',
		},
	];
}
