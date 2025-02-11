const { calculateRemainingDays } = require("../js/RemainingDays");

function getDaysDifference(targetDate) {
    return Math.floor((targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

it("should return zero when the date is today", () => {
    const today = new Date();
    expect(calculateRemainingDays(today)).toEqual(0);
});

it("should correctly calculate days for a future date", () => {
    const future = new Date("2025-02-11");
    const expected = getDaysDifference(future);
    expect(calculateRemainingDays(future)).toBe(expected);
});

it("should return a negative value for a past date", () => {
    const past = new Date("2020-02-11");
    const expected = getDaysDifference(past);
    expect(calculateRemainingDays(past)).toBe(expected);
});
