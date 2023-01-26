import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import * as S from './styles';

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate('players', { group: group });
  }

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
          onChangeText={setGroup}
        />
        <Button
          title="Criar grupo"
          onPress={handleNew}
        />
      </S.Content>
    </S.Container>
  );
}