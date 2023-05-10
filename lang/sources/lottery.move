module blind_box::lottery {

    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event::emit;
    use std::string::{Self, String};

    const EInvalid: u64 = 0;

    // Bonus pool
    struct Pool {
        id: UID,
        bonuses: vector<Bonus>
    }


    struct Attribute {
        name: String,
        value: String
    }
    
    // The bonus may be U, NFT and native token. 
    struct Bonus {
        name: String,
        type: String,
        attributes: vector<Attribute>
    }

    // Access control
    struct AdminRole has key, store {
        id: UID
    }

    // Event section

    struct OpenEvent has copy, drop {

    }

    // package init function
    fun init(ctx: &mut TxContext){
        let admin_role = AdminRole { id: object::new(ctx)};
        let admin = tx_context::sender(ctx);
        transfer::public_transfer(admin_role, admin);
    }

    public entry fun open(ctx: &mut TxContext){

    }

    public entry fun add_bonus(ctx: &mut TxContext){

    }

    /// whitelist
    public entry fun whitelist(accounts: vector<address>, ctx: &mut TxContext) {
        while (vec::length(&accounts) > 0) {
            let account = vec::pop_back(&mut accounts);
            // assert account            
        }
    }

}