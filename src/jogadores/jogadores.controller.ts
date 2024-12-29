import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar.jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores') //responde no path api/v1
export class JogadoresController {
  //injetei a dependencia de JogadoresService
  constructor(private readonly jogadoresService: JogadoresService) {}

  //metodo que responde
  @Post()
  async criarAtualizarJogador(
    //recupera o corpo boy e transforma em DTO
    @Body() criarjogadordto: CriarJogadorDto,
  ) {
    //////teste apenas
    ////return JSON.stringify(`{
    ////  aplicaçao: 'Criação de Jogadores',
    ////  nome: 'Jogador 1',
    ////}`);
    //const { email } = criarjogadordto;
    //return JSON.stringify(`{
    //  "email": ${email},
    //}`);

    //controller usa a classe services
    await this.jogadoresService.criarAtualizarJogador(criarjogadordto);
  }

  //handle de respota GET
  @Get()
  async consultarjoadores(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      //chama busca por email
      return this.jogadoresService.consultarJogadoresEmail(email);
    } else {
      //busca jogadores e exibe, retornando todos os jogadores ou um por e-mail
      //         .jogadoresService precisa ter esse metodo .consultarTodosJogadores
      return this.jogadoresService.consultarTodosJogadores();
    }
  }

  @Delete()
  //deletar o jogador
  async deletarJogador(@Query('email') email: string): Promise<void> {
    this.jogadoresService.deletarJorgador(email);
  }
}
