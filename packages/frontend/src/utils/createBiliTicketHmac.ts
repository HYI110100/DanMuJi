export async function createBiliTicketHmac(key: string, data: string, algorithm = 'SHA-256') {
    // 将密钥转换为 ArrayBuffer
    const encoder = new TextEncoder();
    const keyBuffer = encoder.encode(key);
  
    // 导入密钥
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'HMAC', hash: { name: algorithm } },
        false,
        ['sign']
    );
  
    // 生成 HMAC
    const hmacBuffer = await window.crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        encoder.encode(data)
    );
  
    // 将 HMAC 转换为十六进制字符串
    const hmacArray = Array.from(new Uint8Array(hmacBuffer));
    const hmacHex = hmacArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hmacHex;
  }