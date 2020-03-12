import { ISection } from "~/models";
import { scan } from "~/utilities/scan";

/**
 * @param contents The contents of your JSON file
 * @param selector A function that accepts a section and determines if it should be uncommented by returning true (uncomment) or false (don't uncomment).
 */
export function uncomment(
	contents: string | Buffer,
	selector: (section: ISection) => boolean = () => true
): string {
	const sections = scan(contents.toString().replace(/\/\/\s(?!@)/g, ""));

	const sectionsToUncomment = sections.filter(selector);

	const uncommented = contents
		.toString()
		.split("\n")
		.map((line, i) => {
			const shouldUncomment = sectionsToUncomment.some(
				section => i >= section.start && i <= section.end
			);

			if (shouldUncomment) return line.replace("// ", "");

			return line;
		})
		.join("\n");

	return uncommented;
}
