import testEnv from "./testEnvConfig";
import { rep } from "../protos/peer";

const { EventTube } = testEnv === "production" 
    ? require("../lib")
    : require("../src");


describe("事件订阅与数据获取", () => {
    const eventMsgType = rep.protos.Event;
    const blockMsgType = rep.protos.Block;

    it("订阅RepChain区块相关事件，获得区块数据后可以主动关闭", (done) => {
        const et = new EventTube("ws://localhost:8081/event", ((evt) => {
            const ed = Buffer.from(evt.data);
            const msg = eventMsgType.decode(ed);
            expect(msg.action).toBeGreaterThan(0);
            expect(msg.action).toBeLessThan(12);
            if (msg.blk) {
                expect(msg.blk).toBeInstanceOf(blockMsgType);
                et.close("works done");
                done();
            }
        }));
        expect(et).toBeDefined();
    });
});
