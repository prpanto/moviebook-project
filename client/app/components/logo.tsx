import { Link } from "react-router";
import { Film } from "lucide-react";
import { cn } from "~/lib/utils";

export default function Logo({ className }: { className?: string }) {
	return  (
		<Link to="/" className={cn("flex items-center gap-2 text-primary", className)}>
			<Film />
			<span className="text-xl font-bold">Mora</span>
		</Link>
	);
}
