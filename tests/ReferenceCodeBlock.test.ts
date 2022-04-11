import {
    parseReference,
    codeReducer,
} from "../src/theme/ReferenceCodeBlock/index";

describe("ReferenceCodeBlock Tests", () => {

    const constructReferenceUrl = ({
        url,
        fromLine,
        toLine,
        fallbackText,
    }: {
        url: string;
        fromLine?: number;
        toLine?: number;
        fallbackText?: string;
    }) =>
        `\`\`\`${
            url +
            (fromLine ? "#L" + fromLine : "") +
            (toLine ? "-L" + toLine : "") +
            (fallbackText ?? "")
        }\`\`\``;
        
    describe("parseReference", () => {
        let fromLine: number;
        let toLine: number;

        const filePath = "src/theme/ReferenceCodeBlock/index.tsx";
        const repoName = "saucelabs/docusaurus-theme-github-codeblock";
        const url = `https://github.com/${repoName}/blob/main/${filePath}`;
        const expectedUrl = `https://raw.githubusercontent.com/${repoName}/main/${filePath}`;

        it("should parse GitHub reference properly it its just the URL", () => {
            fromLine = undefined;
            toLine = undefined;
            const ref = constructReferenceUrl({
                url,
                fromLine,
                toLine,
            });
            expect(parseReference(ref)).toEqual({
                fromLine: 0,
                title: filePath,
                toLine: Infinity,
                url: expectedUrl,
            });
        });
        it("should parse GitHub reference properly if it has a from and to line number", () => {
            fromLine = 105;
            toLine = 108;
            const ref = constructReferenceUrl({
                url,
                fromLine,
                toLine,
            });
            expect(parseReference(ref)).toEqual({
                fromLine: fromLine - 1,
                title: filePath,
                toLine: toLine - 1,
                url: expectedUrl,
            });
        });
        it("should parse GitHub reference properly if it has just a from number", () => {
            fromLine = 105;
            toLine = undefined;
            const ref = constructReferenceUrl({
                url,
                fromLine,
                toLine,
            });            expect(parseReference(ref)).toEqual({
                fromLine: fromLine - 1,
                title: filePath,
                toLine,
                url: expectedUrl,
            });
        });
        it("should parse GitHub reference properly if it has fallback content", () => {
            fromLine = 105;
            toLine = 108;
            const fallbackText = `\nsome fallback text`;
            const ref = constructReferenceUrl({
                url,
                fromLine,
                toLine,
                fallbackText,
            });
            expect(parseReference(ref)).toEqual({
                fromLine: fromLine - 1,
                title: filePath,
                toLine: toLine - 1,
                url: expectedUrl,
            });
        });
    });



    describe("codeReducer", () => {
        const prevState = { foo: "bar" };

        it("should handle loading", () => {
            expect(
                codeReducer(prevState, { type: "loading", value: "" })
            ).toEqual({ foo: "bar", loading: true });
        });
        it("should handle loaded", () => {
            expect(
                codeReducer(prevState, { type: "loaded", value: "foobar" })
            ).toEqual({ code: "foobar", foo: "bar", loading: false });
        });
        it("should handle error", () => {
            expect(
                codeReducer(prevState, { type: "error", value: "ups" })
            ).toEqual({ error: "ups", foo: "bar", loading: false });
        });
        it("should handle unknown", () => {
            expect(
                // @ts-ignore
                codeReducer(prevState, { type: "unknown", value: "" })
            ).toEqual(prevState);
        });

        it("should handle fallback", () => {
            expect(
                codeReducer(prevState, { type: "fallback", value: "" })
            ).toEqual({
                code: "",
                fallback: true,
                foo: "bar",
                loading: false,
            });
        });
    });
});
