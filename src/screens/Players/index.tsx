import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';

import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { playerRemuveByGroup } from '@storage/player/playerRemuveByGroup';
import { playersGetByGroupsTeam } from '@storage/player/playersGetByGroupsAndTeam';

import { AppError } from '@utils/AppError';

import * as S from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();

  const routes = useRoute();
  const { group } = routes.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

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
      fetchPlayersByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Jogador', error.message);
      } else {
        Alert.alert('Novo Jogador', 'Não foi possível adicionar o jogador 😥');
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupsTeam(group, team);

      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert('Jogador', 'Não foi possível buscar os jogadores 😥');
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemuveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Remover Jogador', 'Não foi possível remover o jogador 😥');
    }
  }

  async function groupRevmove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover Jogador', 'Não foi possível remover o jogador 😥');
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover Turma',
      'Deseja remover a turma?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRevmove() },
      ]
    );
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <S.Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />
      <S.Form>
        <Input
          value={newPlayerName}
          placeholder="Nome ddo jogador"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </S.Form>
      <S.HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
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
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
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
        onPress={handleGroupRemove}
      />
    </S.Container>
  );
}




