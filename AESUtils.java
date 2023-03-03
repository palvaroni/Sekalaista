package com.palvaroni.sekalaista.util;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * Utility class for AES encryption and decryption.
 */
public final class AESUtils {
    private AESUtils() {
        // Util class, should not be instantiated
    }

    /**
     * Encrypts a string using AES/CTR/NoPadding.
     * @param payload   Data to be encrypted
     * @param key       Encryption key
     * @return          Encrypted data as a base64 encoded string
     * @throws NoSuchPaddingException
     * @throws NoSuchAlgorithmException
     * @throws InvalidAlgorithmParameterException
     * @throws InvalidKeyException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     * @throws IOException
     */
    public static String encrypt(String payload, SecretKey key)
            throws NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException, InvalidKeyException,
            IllegalBlockSizeException, BadPaddingException, IOException {
        final Cipher cipher = Cipher.getInstance("AES/CTR/NoPadding");
        final byte[] iv = generateRandomIv(cipher.getBlockSize());
        final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(iv));

        byte[] encrypted = cipher.doFinal(payload.getBytes());
        // Prepend IV to encrypted data for decryption
        outputStream.write(iv);
        outputStream.write(encrypted);

        return Base64.getEncoder().encodeToString(outputStream.toByteArray());
    }

    /**
     * Decrypts a string using AES/CTR/NoPadding.
     * @param payload   Data to be decrypted
     * @param key       Encryption key
     * @return          Decrypted data as a string
     * @throws NoSuchPaddingException
     * @throws NoSuchAlgorithmException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     * @throws InvalidKeyException
     * @throws IOException
     * @throws InvalidAlgorithmParameterException
     */
    public static String decrypt(String payload, SecretKey key)
            throws NoSuchPaddingException, NoSuchAlgorithmException,
            IllegalBlockSizeException, BadPaddingException,
            InvalidKeyException, IOException, InvalidAlgorithmParameterException {
        final Cipher cipher = Cipher.getInstance("AES/CTR/NoPadding");
        final ByteArrayInputStream inputStream = new ByteArrayInputStream(Base64.getDecoder().decode(payload));
        // Read out IV from payload
        final byte[] iv = inputStream.readNBytes(cipher.getBlockSize());
        final byte[] data = inputStream.readAllBytes();

        cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec(iv));
        byte[] decrypted = cipher.doFinal(data);
        return new String(decrypted);
    }

    /**
     * Generates a new random AES key.
     * @param keysize   Key length in bits
     * @return          AES key as a SecretKey
     * @throws NoSuchAlgorithmException
     */
    public static SecretKey generateKey(int keysize) throws NoSuchAlgorithmException {
        final var keyGenerator = KeyGenerator.getInstance("AES");
        keyGenerator.init(keysize);
        return keyGenerator.generateKey();
    }

    /**
     * Decodes a base64 encoded AES key.
     * @param encodedKey    Base64 encoded AES key
     * @return              AES key as a SecretKey
     */
    public static SecretKey decodeKey(String encodedKey) {
        if (encodedKey == null || encodedKey.isEmpty()) {
            return null;
        }

        return new SecretKeySpec(Base64.getDecoder().decode(encodedKey), "AES");
    }

    /**
     * Encodes an AES key as a base64 string.
     * @param key   AES key as a SecretKey
     * @return      Base64 encoded AES key
     */
    public static String encodeKey(SecretKey key) {
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }

    /**
     * Generates a new random IV (initialization vector) for AES encryption.
     * @param blockSize Block size of the cipher
     * @return          IV as a byte array.
     */
    public static byte[] generateRandomIv(int blockSize) {
        byte[] iv = new byte[blockSize];
        new SecureRandom().nextBytes(iv);
        return iv;
    }
}
