import { useState } from 'react';
import { FlatList } from 'react-native';

import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';

import * as S from './styles';

export function Players() {
  const [team, setTeam] = useState('Time 1');
  const [players, setPlayers] = useState(['Dakson', 'Vini', 'Rafael'])

  return (
    <S.Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />
      <S.Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />
        <ButtonIcon icon="add" />
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