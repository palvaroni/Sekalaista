using System;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security;
using System.Security.Cryptography;
using System.Text;

public static class AESUtils
{
    private static byte[] key =
    {
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
        0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16
    };

    private static Aes aes = Aes.Create();

    /// <summary>
    /// Encrypt the contents of the given SecureString and return the result as a Base64 encoded string.
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    public static string Encrypt(SecureString value)
    {
        aes.Key = key;
        aes.Padding = PaddingMode.PKCS7;

        IntPtr valuePtr = IntPtr.Zero;

        try
        {
            valuePtr = Marshal.SecureStringToGlobalAllocUnicode(value);
            var valueAsBytes = new byte[value.Length * 2];
            Marshal.Copy(valuePtr, valueAsBytes, 0, valueAsBytes.Length);

            using (var memoryStream = new MemoryStream())
            {
                using (var cryptoStream = new CryptoStream(memoryStream, aes.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    cryptoStream.Write(valueAsBytes, 0, valueAsBytes.Length);
                    cryptoStream.FlushFinalBlock();

                    var encryptedData = memoryStream.ToArray();
                    var ivAndValue = new byte[aes.IV.Length + encryptedData.Length];

                    aes.IV.CopyTo(ivAndValue, 0);
                    encryptedData.CopyTo(ivAndValue, aes.IV.Length);

                    Array.Clear(valueAsBytes, 0, valueAsBytes.Length);

                    return Convert.ToBase64String(ivAndValue);
                }
            }
        }
        finally
        {
            Marshal.ZeroFreeGlobalAllocUnicode(valuePtr);
        }
    }

    public static SecureString Decrypt(string value)
    {
        aes.Key = key;
        aes.Padding = PaddingMode.PKCS7;
        var secureString = new SecureString();

        try
        {
            byte[] ivAndValue = Convert.FromBase64String(value);
            byte[] iv = ivAndValue.Take(aes.IV.Length).ToArray();
            byte[] decryptBytes = ivAndValue.Skip(aes.IV.Length).ToArray();
            var readBuffer = new char[1];

            using (var memoryStream = new MemoryStream(decryptBytes))
            {
                using (var cryptoStream = new CryptoStream(memoryStream, aes.CreateDecryptor(key, iv), CryptoStreamMode.Read))
                {
                    using (var decryptReader = new StreamReader(cryptoStream, Encoding.Unicode))
                    {
                        while (!decryptReader.EndOfStream)
                        {
                            decryptReader.ReadBlock(readBuffer, 0, 1);
                            secureString.AppendChar(readBuffer[0]);
                        }

                        readBuffer[0] = '\0';

                        return secureString;
                    }
                }
            }
        }
        catch
        {
            return new SecureString();
        }
    }
}
