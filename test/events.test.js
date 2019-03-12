import protobuf from "protobufjs";
import EventTube from "../lib/events";


describe("事件订阅与数据获取", () => {
    let Message;
    // let Block;
    beforeAll((done) => {
        protobuf.load("protos/peer.proto", (err, root) => {
            if (err) {
                throw err;
            }
            Message = root.lookupType("rep.protos.Event");
            // Block = root.lookupType('rep.protos.Block');
            done();
        });
    });

    test("订阅RepChain事件", (done) => {
        let cout = 0;
        const et = new EventTube("ws://localhost:8081/event", ((evt) => {
            // console.log("Received info from websocket service:\n", evt);
            const ed = Buffer.from(evt.data);
            const msg = Message.decode(ed);
            console.log(msg);
            expect(msg.action).toBeGreaterThan(0);
            expect(msg.action).toBeLessThan(12);
            cout++;
            if (cout > 2) {
                et.close("works done");
                done();
            }
        }));
        expect(et).toBeDefined();
    });
});
