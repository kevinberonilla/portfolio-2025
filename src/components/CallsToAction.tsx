'use client';

import Link from 'next/link';
import { forwardRef, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CallToAction {
	ariaLabel: string;
	className?: string;
	disabled?: boolean;
	href: string;
	icon: ReactNode;
	label: string;
}
interface CallsToActionProps {
	buttons: CallToAction[];
	className?: string;
	disabled?: boolean;
	header?: boolean;
}

const CallsToAction = forwardRef<HTMLDivElement, CallsToActionProps>(
	({ buttons, className, disabled = false, header = false }, ref) => {
		return (
			<div
				className={cn('flex items-center gap-2.5', className)}
				ref={ref}
			>
				{buttons.map((button) => (
					<Button
						aria-label={button.ariaLabel}
						asChild
						className={cn(
							'cursor-pointer text-shadow-black/20 text-shadow-md',
							button.className
						)}
						disabled={disabled}
						key={button.label}
						size={header ? 'sm' : 'default'}
						tabIndex={disabled ? -1 : 0}
					>
						<Link
							href={button.href}
							onClick={(event) => {
								if (disabled) {
									event.preventDefault();
								}
							}}
							prefetch={false}
							rel="noreferrer"
							tabIndex={disabled ? -1 : 0}
							target="_blank"
						>
							{button.icon}
							<span
								className={cn(
									header && 'hidden text-xs sm:inline'
								)}
							>
								{button.label}
							</span>
						</Link>
					</Button>
				))}
			</div>
		);
	}
);

CallsToAction.displayName = 'CallsToAction';

export default CallsToAction;
