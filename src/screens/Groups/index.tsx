import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import * as S from './styles';

export function Groups() {
  return (
    <S.Container>
      <Header />
      <Highlight
        title="Grupos"
        subtitle="Aqui você encontra os grupos que você participa"
      />
      <GroupCard title="Grupo 1" />
    </S.Container>
  );
}
