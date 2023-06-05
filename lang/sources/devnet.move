module lang::devnet {
    use std::string::{Self, String};
    use std::type_name;
    use sui::event;
    use sui::tx_context::{Self, TxContext};

    struct Coin<phantom T> has store {}
    struct TypeEvent has copy, drop {
        input_type: String,
        inner_type: String,
        equals: bool,
        sender: address,
    }

    public fun get_string(): String {
        string::utf8(b"hello world")
    }

    public entry fun get_name<T>(name: String, ctx: &mut TxContext) {
        let input_type = name;
        let inner_type = string::from_ascii(type_name::into_string(type_name::get<Coin<T>>()));
        let equals = input_type == inner_type;
        let sender = tx_context::sender(ctx);
        let event_type = TypeEvent {
            input_type,
            inner_type,
            equals,
            sender,
        };
        event::emit(event_type);
    }


    
}