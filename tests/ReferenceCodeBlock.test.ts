import {
    parseReference,
    codeReducer,
} from "../src/theme/ReferenceCodeBlock/index";

describe("ReferenceCodeBlock Tests", () => {
    describe("parses url correctly", () => {
        it("should get just the URL", () => {
            const url =
                "https://raw.githubusercontent.com/saucelabs/docusaurus-theme-github-codeblock/main/src/theme/ReferenceCodeBlock/index.tsx";
            const ref = `\`\`\`${url}\`\`\``;
            const fullUrl = ref
                .slice(ref.indexOf("https"), -1)
                .trim()
                .split("\n")[0]
                .trim()
                .replace(/\`/g, "");
            expect(fullUrl).toBe(url);
        });

        it("should get just the URL even if its got line numbers", () => {
            const url =
                "https://raw.githubusercontent.com/saucelabs/docusaurus-theme-github-codeblock/main/src/theme/ReferenceCodeBlock/index.tsxL1-L2";
            const ref = `\`\`\`${url}\`\`\``;
            const fullUrl = ref
                .slice(ref.indexOf("https"), -1)
                .trim()
                .split("\n")[0]
                .replace(/\`/g, "");
            expect(fullUrl).toBe(url);
        });

        it("should get just the URL even if its got line numbers and it has new lines", () => {
            const url =
                "https://raw.githubusercontent.com/saucelabs/docusaurus-theme-github-codeblock/main/src/theme/ReferenceCodeBlock/index.tsx#L1-L2";
            const ref = `\`\`\`${url}\nsome fallback text\`\`\``;
            const fullUrl = ref
                .slice(ref.indexOf("https"), -1)
                .trim()
                .split("\n")[0]
                .replace(/\`/g, "");
            expect(fullUrl).toBe(url);
        });
    });

    describe("parseReference", () => {
        let fromLine: number;
        let toLine: number;

        const filePath = "src/theme/ReferenceCodeBlock/index.tsx";
        const repoName = "saucelabs/docusaurus-theme-github-codeblock";
        const url = `https://github.com/${repoName}/blob/main/${filePath}`;
        const expectedUrl = `https://raw.githubusercontent.com/${repoName}/main/${filePath}`;

        it("should parse GitHub reference properly", () => {
            const ref = `\`\`\`${url +
                (fromLine ? "#L" + fromLine : "") +
                (toLine ? "-L" + toLine : "")}\`\`\``;
            expect(parseReference(ref)).toEqual({
                fromLine: 0,
                title: filePath,
                toLine: Infinity,
                url: expectedUrl,
            });
        });
        it("should parse GitHub reference properly", () => {
            fromLine = 105;
            toLine = 108;
            const ref = `\`\`\`${url +
                (fromLine ? "#L" + fromLine : "") +
                (toLine ? "-L" + toLine : "")}\`\`\``;
            console.log(ref);
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
