// Elliptic Curve Diffie Hellman

// Alice and Bob

// Want to share communication securely

// to communicate, they must share a secret

// then use that secret to encrypt traffic

// secret is used an an encryption key (e.g. 32-byte string)

// key exchange

// challenge is doing a secure key exchange

// to exchange a secret, Alice and Bob must have public/private keypairs

// Alice knows Bob's public key

// Bob knows Alice's public key

// Signal Protocol - every communication uses a different encryption key, 
// that cannot be derived from the previous encryption key

var sodium = require('sodium-native')

// X25519 crypto algorithm for public/private key pairs
// Ed25519 algorithm (twisted Edwards curve)

// alice makes a public/private key pair
var aliceX25519PublicKey = sodium.sodium_malloc(sodium.crypto_box_PUBLICBYTES)
var aliceX25519SecretKey = sodium.sodium_malloc(sodium.crypto_box_SECRETKEYBYTES)

console.log(`alice's public key is ${sodium.crypto_box_PUBLICBYTES}-bytes long`)

// bob makes a public/private key pair

// assume that Alice can access Bob's public key and vice versa

// Alice runs an ECDH using her private key, and Bob's public key

// Bob runs an ECDH using his private key, and Alice's public key

// Ideally, both Alice and Bob will have access to the same secret


