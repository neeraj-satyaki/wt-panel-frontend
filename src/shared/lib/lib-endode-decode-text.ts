export function encodeDecodeText(
  text: string,
  operation: 'encode' | 'decode',
  key: string,
): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const shiftChar = (char: string, shift: number): string => {
    const index = characters.indexOf(char)
    if (index !== -1) {
      const shiftedIndex = (index + shift) % characters.length
      return characters.charAt(
        shiftedIndex >= 0 ? shiftedIndex : characters.length + shiftedIndex,
      )
    }
    return char
  }

  const processText = (operation: number, key: string): string => {
    let keyIndex = 0
    return text
      .split('')
      .map((char) => {
        if (char.match(/[a-zA-Z0-9!@#$%^&*()_\-\+=\[\]{}|;:,.<>?]/)) {
          const shift = key.charCodeAt(keyIndex) || 0
          keyIndex = (keyIndex + 1) % key.length
          return shiftChar(char, operation * shift)
        }
        return char
      })
      .join('')
  }

  if (operation.toLowerCase() === 'encode') {
    const encodeText = processText(1, key)
    console.log(encodeText)
    return encodeText
  } else if (operation.toLowerCase() === 'decode') {
    const decodeText = processText(-1, key)
    console.log(decodeText)
    return decodeText
  } else {
    // Если указан неверный атрибут операции
    throw new Error('Неверный атрибут операции. Используйте "encode" или "decode".')
  }
}
