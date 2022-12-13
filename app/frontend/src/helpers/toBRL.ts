const format = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }

const toBrl = (value: string): string => {
  return parseFloat(value).toLocaleString('pt-BR', format)
}

export default toBrl
