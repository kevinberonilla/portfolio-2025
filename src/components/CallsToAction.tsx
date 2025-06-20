'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { FiFileText, FiGithub, FiLinkedin } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CallsToActionProps {
	className?: string;
	header?: boolean;
}

const CallsToAction = forwardRef<HTMLDivElement, CallsToActionProps>(
	({ className, header = false }, ref) => {
		return (
			<div
				className={cn('flex items-center gap-2.5', className)}
				ref={ref}
			>
				<Button
					aria-label="View Resume"
					asChild
					className="cursor-pointer bg-amber-600 text-shadow-black/20 text-shadow-md hover:bg-amber-700"
					size={header ? 'sm' : 'default'}
				>
					<Link href="/downloads/kevin-beronilla-resume.pdf">
						<FiFileText
							className={cn(
								'drop-shadow-xs drop-shadow-black/60',
								header && 'size-3.5'
							)}
						/>
						<span className={cn(header && 'hidden sm:inline')}>
							Resume
						</span>
					</Link>
				</Button>
				<Button
					aria-label="View LinkedIn"
					asChild
					className="cursor-pointer bg-sky-700 text-shadow-black/20 text-shadow-md hover:bg-sky-800"
					size={header ? 'sm' : 'default'}
				>
					<Link href="https://www.linkedin.com/in/kevinberonilla/">
						<FiLinkedin
							className={cn(
								'drop-shadow-xs drop-shadow-black/60',
								header && 'size-3.5'
							)}
						/>
						<span className={cn(header && 'hidden sm:inline')}>
							LinkedIn
						</span>
					</Link>
				</Button>
				<Button
					aria-label="View GitHub"
					asChild
					className="cursor-pointer bg-zinc-700 text-shadow-black/20 text-shadow-md hover:bg-zinc-800"
					size={header ? 'sm' : 'default'}
				>
					<Link href="https://github.com/kevinberonilla">
						<FiGithub
							className={cn(
								'drop-shadow-xs drop-shadow-black/60',
								header && 'size-3.5'
							)}
						/>
						<span className={cn(header && 'hidden sm:inline')}>
							GitHub
						</span>
					</Link>
				</Button>
			</div>
		);
	}
);

CallsToAction.displayName = 'CallsToAction';

export default CallsToAction;
