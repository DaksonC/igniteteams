import { Header } from '@components/Header';
import * as S from './styles';
import { Highlight } from '@components/Highlight';

export function Groups() {
  return (
    <S.Container>
      <Header />
      <Highlight
        title="Grupos"
        subtitle="Aqui você encontra os grupos que você participa"
      />
    </S.Container>
  );
}
