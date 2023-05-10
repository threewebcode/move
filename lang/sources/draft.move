module blind_box::gift {
    
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event::emit;
    use sui::url::{Self, Url};
    use std::vector as vec;
    use std::string;


    fun init(ctx: &mut TxContext) {
        // init account list with empty vector
        let list_id = object::new(ctx);
        let owner = tx_context::sender(ctx);
        let list = AccountList {
            id: list_id,
            accounts: vec::empty<address>()
        };
        transfer::transfer(list, owner);
    }

    const EDummyError: u64 = 0;
    const NFT_TOTAL: u64 = 50_000;
    const ROYALTY_RATE: u64 = 5;

    struct LoaNFT has key, store {
        id: UID,
        name: string::String,
        description: string::String,
        url: Url,
        price: u64
    }

    struct MintLoaNFTEvent has copy, drop {
        object_id: ID,
        creator: address,
        name: string::String
    }

    public entry fun mint_loa(name: vector<u8>,description: vector<u8>,url: vector<u8>,ctx: &mut TxContext) {
        let nft = LoaNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url)
        };
        let sender = tx_context::sender(ctx);
        emit(MintLoaNFTEvent {
            object_id: object::uid_to_inner(&nft.id),
            creator: sender,
            name: nft.name,
        });
        transfer::public_transfer(nft, sender);
    }

    public entry fun update_url(nft: &mut LoaNFT, new_url: vector<u8>) {
        nft.url = string::utf8(new_url)
    }

}