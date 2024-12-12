export function uuid(
    length = 6,
    options?: ('numbers' | 'lowercaseLetters' | 'uppercaseLetters' | 'symbols')[],
  ) {
    // 定义字符集
    const charset = {
      numbers: '0123456789',
      lowercaseLetters: 'abcdefghijklmnopqrstuvwxyz',
      uppercaseLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      symbols: '!@#$%^&*()_+[]{}|;:,.<>?',
    }
  
    // 检查是否提供了选项，如果未提供，则使用默认值
    options = options || ['numbers', 'lowercaseLetters', 'uppercaseLetters']
  
    // 根据选项构建字符集
    let selectedCharset = ''
    if (options.includes('numbers')) selectedCharset += charset.numbers
    if (options.includes('lowercaseLetters'))
      selectedCharset += charset.lowercaseLetters
    if (options.includes('uppercaseLetters'))
      selectedCharset += charset.uppercaseLetters
    if (options.includes('symbols')) selectedCharset += charset.symbols
  
    // 随机生成字符串
    let result = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * selectedCharset.length)
      result += selectedCharset.charAt(randomIndex)
    }
  
    return result
  }
  