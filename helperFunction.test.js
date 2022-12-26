const helperFunctions = require('./helperFunctions');

describe("HelperFunctions", () => {
    it("returned array all elements except the first, in the same order", () => {
        const args = ["1", "2", 3];
        const modified = helperFunctions.removeFirstArg(args);

        expect(modified).toEqual(expect.arrayContaining(["2", 3]))
        expect(modified.length).toBe(2);
    })

    it("return only the strings that are not blank or a single space", () => {
        const args = [" ", "", "This is not", "t"];
        const modified = helperFunctions.cleanArgs(args);

        expect(modified).toEqual(expect.arrayContaining(["This is not", "t"]))
        expect(modified.length).toBe(2);
    })
})