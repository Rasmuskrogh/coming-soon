import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";

export default defineType({
	name: "comingSoon",
	title: "Coming Soon",
	type: "document",
	icon: HomeIcon,
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			initialValue: "Coming soon",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			description: "Optional line under the heading, e.g. names or a date.",
			type: "string",
		}),
		defineField({
			name: "metaTitle",
			title: "Browser tab title",
			type: "string",
		}),
	],
	preview: {
		select: { title: "heading" },
	},
});
