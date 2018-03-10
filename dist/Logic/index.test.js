"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const index_1 = require("./index");
describe('Total hours', () => {
    it('should return 1', () => {
        const data = [
            { date: new Date(), duration: 3100 },
            { date: new Date(), duration: 200 },
            { date: new Date(), duration: 300 }
        ];
        chai_1.expect(1).to.equal(index_1.TotalHours(data));
    });
});
describe('Hours to do', () => {
    it('should return 7.5', () => {
        // expect(7.5).to.equal(HoursToDo(new Date()));
        chai_1.expect(7.5).to.equal(index_1.HoursToDo(new Date(Date.UTC(2018, 1, 5)), new Date()));
    });
});
//# sourceMappingURL=index.test.js.map