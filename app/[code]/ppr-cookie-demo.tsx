import { cookies } from "next/headers";
import { RenderedAt } from "@/components/rendered-at";
import { nameParamFlag, precomputeFlags } from "@/flags";

export async function PPRCookieDemo({
	params,
}: { params: Promise<{ code: string }> }) {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const cookieStore = await cookies();

	const { code } = await params;

	const nameFlag = await nameParamFlag(code, precomputeFlags);

	const level = cookieStore.get(`level-${nameFlag}`)?.value || "None";

	return (
		<>
			<h2 className="text-xl font-bold text-gray-800 mb-6">
				Cookie Partial Prerendering Example
			</h2>

			<div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
				<p className="text-xl font-medium text-blue-800">
					Level: <span className="font-semibold">{level}</span>
				</p>
			</div>

			<form
				action={async (formData: FormData) => {
					"use server";

					const cookieStore = await cookies();

					const newLevel = formData.get("level")?.toString();

					if (!newLevel) {
						throw new Error("Level is required");
					}

					cookieStore.set(`level-${nameFlag}`, newLevel);
				}}
			>
				<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-3">
					<div className="flex-grow">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Level
						</label>
						<select
							name="level"
							key={level}
							defaultValue={level}
							className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="None">None</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
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

			<RenderedAt />
		</>
	);
}
