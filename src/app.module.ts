//este é um root module
import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [JogadoresModule], //o que entra e sai declaro aqui
  controllers: [], //preciso de controllers insere aqui //é quem responde GET, POST, PATCH, DELETE
  providers: [], //preciso de serviço insere aqui
})
export class AppModule {}
