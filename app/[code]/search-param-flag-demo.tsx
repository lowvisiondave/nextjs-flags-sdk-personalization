import { nameParamFlag, precomputeFlags } from "@/flags";
import { revalidateTag } from "next/cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { PPRCookieDemo } from "./ppr-cookie-demo";
import { Suspense } from "react";
import { RenderedAt } from "../../components/rendered-at";

export async function SearchParamFlagDemo({
	params,
}: { params: Promise<{ code: string }> }) {
	"use cache";

	const { code } = await params;

	cacheTag(code);

	const nameFlag = await nameParamFlag(code, precomputeFlags);

	return (
		<>
			<h2 className="text-xl font-bold text-gray-800 mb-6">
				Static Search Param Example
			</h2>

			<div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
				<p className="text-xl font-medium text-blue-800">
					Hello <span className="font-semibold">{nameFlag}</span>
				</p>
			</div>

			<form method="GET">
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

			<div className="flex flex-col sm:flex-row sm:justify-between items-center ">
				<RenderedAt />

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
		</>
	);
}
