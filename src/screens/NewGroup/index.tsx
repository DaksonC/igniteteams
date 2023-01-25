import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import * as S from './styles';

export function NewGroup() {
  return (
    <S.Container>
      <Header showBackButton />
      <S.Content>
        <S.Icon />
        <Highlight
          title="Crie um grupo para jogar seus games favoritos com seus amigos"
          subtitle="Você será o administrador do grupo"
        />
        <Input
          style={{ marginBottom: 20 }}
          placeholder="Nome do grupo"
        />
        <Button title="Criar grupo" />
      </S.Content>
    </S.Container>
  );
}