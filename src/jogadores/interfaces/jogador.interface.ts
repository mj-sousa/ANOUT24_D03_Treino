//import { Document } from 'mongoose';
//export interface Jogador extends Document {

//sem uso do mongose nesse momento
export interface Jogador {
  readonly _id: string; //id de cadastro
  readonly telefoneCelular: string;
  readonly email: string;
  nome: string;
  ranking: string; //posição do ranking atual
  posicaoRanking: number; //posição no ranking geral
  urlFotoJogador: string; //foto pela internet
}
