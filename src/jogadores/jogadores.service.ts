import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar.jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  //chama o Logger para acompnhar o que acontece durante o desenvolvimento
  private readonly logger = new Logger(JogadoresService.name);

  //define um array do tipo jogador para fazer persistencia
  private jogadores: Jogador[] = [];

  //nesse momento a consistencia de dados que esse service vai realizar é apenas em memoria
  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    //para atualizar é preciso verificar o email
    const { email } = criaJogadorDto;
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criaJogadorDto);
    } else {
      //grava array de jogadores
      this.criar(criaJogadorDto);
    }
  }

  //metodo para buscar todos os jogadores
  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  //busca jogadores por email
  async consultarJogadoresEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }
    return jogadorEncontrado;
  }

  //deletar jogador
  async deletarJorgador(email: string): Promise<void> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
  }

  private criar(criaJogadorDto: CriarJogadorDto): void {
    const { nome, email, telefoneCelular } = criaJogadorDto;
    const jogador: Jogador = {
      _id: uuidv4(), //apos instalado pode ser chamado corretamente
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'http://localhost/fotos/jogador/1',
    };
    //console.log('Dados da gravação: ', jogador);
    this.logger.log(`criar jogador DTO: ${JSON.stringify(jogador)}`); //log para verificar
    this.jogadores.push(jogador);
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criaJogadorDto: CriarJogadorDto,
  ): void {
    //recebe novo nome do jogador
    const { nome } = criaJogadorDto;
    jogadorEncontrado.nome = nome;
  }
}
