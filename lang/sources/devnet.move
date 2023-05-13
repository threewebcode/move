module lang::devnet {
    use std::string::{Self, String};

    public fun get(): String {
        string::utf8(b"hello world")
    }
    
}