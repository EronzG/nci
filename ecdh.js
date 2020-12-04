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
var aliceX25519PublicKey = sodium.sodium_malloc(sodium.crypto_box_PUBLICKEYBYTES)
var aliceX25519SecretKey = sodium.sodium_malloc(sodium.crypto_box_SECRETKEYBYTES)
sodium.sodium_memzero(aliceX25519PublicKey)
sodium.sodium_memzero(aliceX25519SecretKey)

console.log(`alice's public key is ${sodium.crypto_box_PUBLICKEYBYTES}-bytes long`)
console.log(`alice's secret key is ${sodium.crypto_box_SECRETKEYBYTES}-bytes long`)

sodium.crypto_box_keypair(aliceX25519PublicKey, aliceX25519SecretKey)

console.log(`Alice's public key is: ${aliceX25519PublicKey.toString('base64')}`)
console.log(`Alice's private key is: ${aliceX25519SecretKey.toString('base64')}`)

// bob makes a public/private key pair

// assume that Alice can access Bob's public key and vice versa

// Alice runs an ECDH using her private key, and Bob's public key

// Bob runs an ECDH using his private key, and Alice's public key

// Ideally, both Alice and Bob will have access to the same secret


