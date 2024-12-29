import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller'; //injetou modulo
import { JogadoresService } from './jogadores.service';

@Module({
  controllers: [JogadoresController], //injetou jogadorescontroller aqqui
  providers: [JogadoresService], //injetou jogadoresService aqqui
})
export class JogadoresModule {}
