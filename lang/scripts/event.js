const { JsonRpcProvider, Connection, devnetConnection, testnetConnection} = require("@mysten/sui.js");

const DEFAULT_FAUCET_URL = devnetConnection.faucet;
const DEFAULT_FULLNODE_URL = devnetConnection.fullnode;

function getProvider() {
    return new JsonRpcProvider(
        testnetConnection
    );
}

async function main() {
    const provider = getProvider();
    let events = await provider.queryEvents({
        query: {"Transaction":"FpccDSmL94NzgNCLpHTT7iSkMBPVB9XQBmgNPXscH7tA"}
    });
    // console.log(events);
    // await provider.subscribeEvent({
    //     // filter: { Sender:"0x84c123fcd0e19ddd994c22f21d3e2074fe2b6f5fe9fb9c8871ae6eaf8a8b7931"},
    //     filter: {"All": []},
    //     onMessage: (event) => {
    //         console.log(event.transactionModule, event.type, event.packageId);
    //     }
    // });
}

main();

