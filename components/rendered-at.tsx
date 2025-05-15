export function RenderedAt() {
	return (
		<p className="text-sm text-gray-500 mb-3 sm:mb-0">
			Rendered at: <span className="font-mono">{new Date().toISOString()}</span>
		</p>
	);
}
