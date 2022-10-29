import { Request, Response } from 'express';

import { CreateClientUseCase } from './CreateClientUseCase';

export class CreateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const avatar = req.file?.filename;
    const {
      email,
      username,
      password,
      name,
      lastname,
      cpf,
      cellphone,
      date,
      cep,
      logradouro,
      numero,
      complemento,
      referencia,
      bairro,
      cidade,
      UF,
    } = req.body;

    const createClientUseCase = new CreateClientUseCase();

    const result = await createClientUseCase.execute({
      email,
      username,
      avatar: avatar ?? null,
      password,
      name,
      lastname,
      cpf,
      cellphone,
      date,
      cep,
      logradouro,
      numero,
      complemento,
      referencia,
      bairro,
      cidade,
      UF,
    });

    return res.status(201).json(result);
  }
}
