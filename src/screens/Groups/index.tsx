import { Alert, FlatList } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import * as S from './styles';


export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível buscar turmas 😥');
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <S.Container>
      <Header />
      <Highlight
        title="Turmas"
        subtitle="jogue com a sua turma"
      />
      {
        isLoading ? <Loading /> :
          <FlatList
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <GroupCard
                title={item}
                onPress={() => handleOpenGroup(item)}
              />
            )}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={() => (
              <ListEmpty message="Você não está em nenhuma turma" />
            )}
            showsVerticalScrollIndicator={false}
          />
      }
      <Button
        title="Criar nova turma"
        onPress={handleNewGroup}
      />
    </S.Container>
  );
}
