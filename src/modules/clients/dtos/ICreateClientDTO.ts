export interface ICreateClientDTO {
  email: string;
  username: string;
  avatar?: string | null;
  password: string;
  name: string;
  lastname: string;
  cpf: string;
  cellphone: string;
  date: Date;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  referencia: string;
  bairro: string;
  cidade: string;
  UF: string;
}
