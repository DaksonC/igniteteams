import { useState } from 'react';
import { FlatList } from 'react-native';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import * as S from './styles';


export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Grupo 1', 'Grupo 2']);

  return (
    <S.Container>
      <Header />
      <Highlight
        title="Grupos"
        subtitle="Aqui você encontra os grupos que você participa"
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => <GroupCard title={item} />}
      />
    </S.Container>
  );
}
