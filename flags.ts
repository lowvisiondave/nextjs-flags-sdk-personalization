import { flag } from "flags/next";

export const nameParamFlag = flag<string>({
	key: "name-param-flag",
	decide: ({ headers }) => {
		const searchParamsHeader = headers.get("x-search-params") ?? "";

		const searchParams = new URLSearchParams(searchParamsHeader);

		return searchParams.get("name") ?? "world";
	},
});

export const precomputeFlags = [nameParamFlag] as const;
