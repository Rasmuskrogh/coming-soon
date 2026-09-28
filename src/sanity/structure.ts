import type { StructureResolver } from "sanity/structure";
import { HomeIcon } from "@sanity/icons/Home";

/**
 * The only content is one singleton document: it opens directly, with
 * no "create new" affordance (see sanity.config.ts for the matching
 * filter on the global create menu).
 */
const SINGLETON_TYPES = new Set(["comingSoon"]);

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Content")
		.items([
			S.listItem()
				.title("Coming Soon")
				.icon(HomeIcon)
				.child(S.document().schemaType("comingSoon").documentId("comingSoon")),
		]);

export function isSingletonType(typeName: string): boolean {
	return SINGLETON_TYPES.has(typeName);
}
