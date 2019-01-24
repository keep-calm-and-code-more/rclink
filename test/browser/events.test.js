import { rep } from "../../protos/peer";
import EventTube from "../../lib/events";


describe("事件订阅与数据获取", () => {
    const Message = rep.protos.Event;

    it("订阅RepChain事件", (done) => {
        let cout = 0;
        const et = new EventTube("ws://localhost:8081/event", ((evt) => {
            // console.log("Received info from websocket service:\n", evt);
            // convert blob to Buffer
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const ed = Buffer.from(fileReader.result);
                const msg = Message.decode(ed);
                // console.log(msg);
                expect(msg.action).toBeGreaterThan(0);
                expect(msg.action).toBeLessThan(12);
                cout++;
                if (cout > 2) {
                    done();
                }
            };
            fileReader.readAsArrayBuffer(evt.data);
        }));
        expect(et).toBeDefined();
    });
});
