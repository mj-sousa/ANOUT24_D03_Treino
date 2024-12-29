import { IsNotEmpty, IsEmail } from 'class-validator';

//atributos que seram enviados para a criação
export class CriarJogadorDto {
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly nome: string;
}
