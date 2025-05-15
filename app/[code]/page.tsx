import { nameParamFlag, precomputeFlags } from "@/flags";
import { revalidateTag } from "next/cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { PPRCookieDemo } from "./ppr-cookie-demo";
import { Suspense } from "react";
import { SearchParamFlagDemo } from "./search-param-flag-demo";

type Params = Promise<{ code: string }>;

export async function generateStaticParams() {
	return [
		{
			code: "",
		},
	];
}

export default async function Page({ params }: { params: Params }) {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
					<div className="p-8 space-y-6">
						<h1 className="text-2xl font-bold text-gray-800 mb-6">
							Next.js Flags SDK Personalization Demo
						</h1>

						<SearchParamFlagDemo params={params} />

						<Suspense fallback={<p className="text-gray-500">Loading...</p>}>
							<PPRCookieDemo params={params} />
						</Suspense>
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
