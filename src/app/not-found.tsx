import Link from 'next/link';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { bgGradient, cn, getCtaButtons } from '@/lib/utils';

export default async function NotFound() {
	return (
		<div className="flex h-dvh flex-col">
			<Header buttons={getCtaButtons(true)} />
			<div
				className={cn(
					'flex grow items-center justify-center overflow-y-auto',
					bgGradient
				)}
			>
				<div className="flex flex-col items-center gap-6 p-8 text-center">
					<div className="text-6xl">😿</div>
					<p className="text-sm leading-relaxed">
						The content you&apos;re looking for could not be found.
					</p>
					<Button asChild variant="outline">
						<Link href="/">Go Home</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
