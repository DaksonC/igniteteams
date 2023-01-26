import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Input } from '@components/Input';
import { AppError } from '@utils/AppError';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { groupCreate } from '@storage/group/groupCreate';

import * as S from './styles';
import { Alert } from 'react-native';

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome do grupo');
      }
      await groupCreate(group);
      navigation.navigate('players', { group: group });

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Erro ao criar grupo');
      }
      console.log(error);
    }
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