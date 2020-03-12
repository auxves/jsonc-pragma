import { ISection } from "~/models";
import { scan } from "~/utilities/scan";

/**
 * @param contents The contents of your JSON file
 * @param selector A function that accepts a section and determines if it should be commented by returning true (comment) or false (don't comment).
 */
export function comment(
	contents: string | Buffer,
	selector: (section: ISection) => boolean = () => true
): string {
	const sections = scan(contents);

	const sectionsToComment = sections.filter(selector);

	const lines = contents.toString().split("\n");

	return lines
		.map((line, i) => {
			if (line.trimStart().startsWith("//")) return line;

			const section = sectionsToComment.find(s => i >= s.start && i <= s.end);

			if (section) {
				const firstLine = lines[section.start];
				const leadingSpaces = /^(\s*)/.exec(firstLine)?.[0].length ?? 0;

				return line.replace(new RegExp(`^(\\s{${leadingSpaces}})`), "$1// ");
			}

			return line;
		})
		.join("\n");
}
