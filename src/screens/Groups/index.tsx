import { useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import * as S from './styles';


export function Groups() {
  const [groups, setGroups] = useState<string[]>(['grupo 1', 'grupo 2']);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

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
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Você não está em nenhum grupo" />
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button
        title="Criar grupo"
        onPress={handleNewGroup}
      />
    </S.Container>
  );
}
