import { cn } from "~/lib/utils";
import FullWidthDivider from "~/components/full-width-divider";
import Logo from "~/components/logo";
import { movies, pages, socials } from "~/content/landing/footer"
import { Button } from "~/components/ui/button";
import { Link } from "react-router";


export function Footer() {
	return (
		<footer
			className={cn(
				"relative mx-auto max-w-5xl lg:border-x ",
				"dark:bg-[radial-gradient(35%_80%_at_15%_0%,--theme(--color-foreground/.1),transparent)]"
			)}
		>
			<FullWidthDivider />

			<div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
				<div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
					<Logo className="gap-1 text-neutral-900" />

					<div className="flex gap-2">
						{socials.map((social, index) => (
							<Button
								asChild
								key={`social-${index}`}
								size="icon"
								variant="outline"
							>
								<Link to={social.link} target="_blank">
									<social.icon />
								</Link>
							</Button>
						))}
					</div>
				</div>

				<div className="col-span-3 w-full md:col-span-1">
					<span className="text-muted-foreground text-xs">Pages</span>

					<div className="mt-2 flex flex-col gap-2">
						{pages.map((page, index) => (
							<Link
								className="w-max text-sm hover:underline text-neutral-900"
								to={page.href}
								key={index}
							>
								{page.label}
							</Link>
						))}
					</div>
				</div>

				<div className="col-span-3 w-full md:col-span-1">
					<span className="text-muted-foreground text-xs">Movies List</span>

					<div className="mt-2 flex flex-col gap-2">
						{movies.map((movie, index) => (
							<Link
								className="w-max text-sm hover:underline text-neutral-900"
								to={movie.href}
								key={index}
							>
								{movie.label}
							</Link>
						))}
					</div>
				</div>
			</div>

			<FullWidthDivider />
			
			<div className="flex items-center justify-center gap-2 py-4">
				<p className="text-center font-light text-muted-foreground text-sm">
					&copy; {new Date().getFullYear()} Mora, All rights reserved
				</p>
			</div>
		</footer>
	);
}
