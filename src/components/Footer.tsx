'use client';

export default function Footer() {
	return (
		<footer className="bg-background text-muted-foreground p-8 text-xs">
			© {new Date().getFullYear()} Kevin Beronilla. All featured projects
			are copyrighted by the respective individuals and organizations of
			which they are a representation of.
		</footer>
	);
}
