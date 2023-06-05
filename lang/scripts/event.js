const { JsonRpcProvider, Connection, devnetConnection, testnetConnection} = require("@mysten/sui.js");

const DEFAULT_FAUCET_URL = devnetConnection.faucet;
const DEFAULT_FULLNODE_URL = devnetConnection.fullnode;

function getProvider() {
    return new JsonRpcProvider(
        devnetConnection
    );
}

async function main() {
    const provider = getProvider();
    let events = await provider.queryEvents({
        query: {"Transaction":"4a7CzaLxYsTJDtS5EsKe4gVwJb2V5xzsaYU3HG6gqKTL"}
    });
    console.log(events.data[0].parsedJson);
    // await provider.subscribeEvent({
    //     // filter: { Sender:"0xdcc2680302021a55088de7e310c045457ee08016d68557639c18a27dd766d8a1"},
    //     filter: {"All": []},
    //     onMessage: (event) => {
    //         console.log(event.transactionModule, event.type, event.packageId);
    //     }
    // });
}

main();

