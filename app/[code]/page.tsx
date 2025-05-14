import { nameParamFlag, precomputeFlags } from "@/flags";
import { revalidateTag } from "next/cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

type Params = Promise<{ code: string }>;

export async function generateStaticParams() {
	return [];
}

export default async function Page({ params }: { params: Params }) {
	"use cache";

	const { code } = await params;

	cacheTag(code);

	const nameFlag = await nameParamFlag(code, precomputeFlags);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
					<div className="p-8">
						<h1 className="text-2xl font-bold text-gray-800 mb-6">
							Next.js Flags SDK Personalization Demo
						</h1>

						<div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
							<p className="text-xl font-medium text-blue-800">
								Hello <span className="font-semibold">{nameFlag}</span>
							</p>
						</div>

						<form method="GET" className="mb-6">
							<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-3">
								<div className="flex-grow">
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Name
									</label>
									<input
										name="name"
										id="name"
										type="text"
										defaultValue={nameFlag}
										className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
									/>
								</div>
								<div className="self-end">
									<button
										type="submit"
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										Submit
									</button>
								</div>
							</div>
						</form>

						<div className="flex flex-col sm:flex-row sm:justify-between items-center border-t border-gray-200 pt-4">
							<p className="text-sm text-gray-500 mb-3 sm:mb-0">
								Rendered at:{" "}
								<span className="font-mono">{new Date().toISOString()}</span>
							</p>

							<button
								type="button"
								onClick={async () => {
									"use server";
									revalidateTag(code);
								}}
								className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Revalidate
							</button>
						</div>
					</div>
				</div>

				{/* Explanation Section */}
				<div className="bg-white rounded-xl shadow-md overflow-hidden">
					<div className="p-8">
						<h2 className="text-xl font-bold text-gray-800 mb-4">
							How This Demo Works
						</h2>

						<div className="prose prose-blue max-w-none">
							<p className="text-gray-600 mb-4">
								This demo showcases the Flags SDK for Next.js, which enables
								efficient handling of dynamic content based on URL parameters.
							</p>

							<a
								className="text-blue-600 hover:underline"
								href="https://github.com/lowvisiondave/nextjs-flags-sdk-personalization"
								target="_blank"
								rel="noreferrer"
							>
								View code on GitHub
							</a>

							<h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
								Feature Flag System
							</h3>
							<p className="text-gray-600 mb-4">
								The demo uses a feature flag that reads the URL search
								parameters and extracts the{" "}
								<code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
									name
								</code>{" "}
								parameter. If no name is provided, it defaults to "world".
							</p>

							<h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
								How It Processes Requests
							</h3>
							<p className="text-gray-600 mb-4">
								When you visit this page, the middleware captures your search
								parameters, precomputes the flag values, and generates a unique
								code that's added to the URL. This allows the page to
								efficiently retrieve the flag values without recalculating them.
							</p>

							<h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
								Benefits
							</h3>
							<ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
								<li>
									<strong>Performance:</strong> Flag values are precomputed once
									in middleware
								</li>
								<li>
									<strong>Caching:</strong> Responses can be cached based on
									flag values
								</li>
								<li>
									<strong>URL Sharing:</strong> Users can share URLs with
									personalized content
								</li>
								<li>
									<strong>ISR Support:</strong> Works with Incremental Static
									Regeneration
								</li>
							</ul>

							<h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
								How to Use
							</h3>
							<ol className="list-decimal pl-5 text-gray-600 mb-4 space-y-2">
								<li>
									Visit the page to see the default greeting ("Hello world")
								</li>
								<li>
									Add a name parameter to the URL (e.g.,{" "}
									<code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
										?name=Alice
									</code>
									)
								</li>
								<li>Use the form to change the name parameter</li>
								<li>
									Click "Revalidate" to refresh the cache for the current flag
									values
								</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
