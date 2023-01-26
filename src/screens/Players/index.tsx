import { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';

import * as S from './styles';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playersGetByGroup';

type RouteParams = {
  group: string;
}

export function Players() {
  const [team, setTeam] = useState('');
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const routes = useRoute();
  const { group } = routes.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Novo Jogador', 'Me diz o nome do jogador 😥');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group);
      const players = await playersGetByGroup(group);
      console.log(players);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Jogador', error.message);
      } else {
        Alert.alert('Novo Jogador', 'Não foi possível adicionar o jogador 😥');
      }
    }
  }



  return (
    <S.Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />
      <S.Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </S.Form>
      <S.HeaderList>
        <FlatList
          data={['Time 1', 'Time 2', 'Time 3']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <S.NumberOfPlayer>{players.length}</S.NumberOfPlayer>
      </S.HeaderList>
      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => setPlayers(players.filter(player => player !== item))}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message='Nenhum jogador encontrado'
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />
      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={() => { }}
      />
    </S.Container>
  );
}


