/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> **/
"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function LinkPage() {
	const searchParams = useSearchParams();
	const link = searchParams.get("link");
	const router = useRouter();

	if (!link) {
		router.push("/");
		return <div className="text-center">No link provided.</div>;
	}
	return <object data={link} className="w-full h-full" title="Embedded page" />;
	// return <embed src={link} className="w-full h-full" title="Embedded page" />;
}
