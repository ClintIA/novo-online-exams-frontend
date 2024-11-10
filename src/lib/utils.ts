import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D+/g, '');

  if (cpf.length !== 11 || /^(.)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  let resto: number;

  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));


}
export const validarTelefone = (telefone: string) => {
  const telefoneLimpo = telefone.replace(/\D/g, '')
  return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11
}
export const validarEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}
export const validarDataNascimento = (data: string) => {
  const dataAtual = new Date()
  const dataNascimento = new Date(data)
  const idade = dataAtual.getFullYear() - dataNascimento.getFullYear()
  return idade >= 0 && idade <= 120
}