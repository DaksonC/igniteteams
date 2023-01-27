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
        return Alert.alert('Nova Turma', 'Informe o nome da turma');
      }
      await groupCreate(group);
      navigation.navigate('players', { group: group });

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Turma', error.message);
      } else {
        Alert.alert('Nova Turma', 'Erro ao criar turma');
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
          title="Nova Turma"
          subtitle="crie uma nova turma para adcionar pessoas"
        />
        <Input
          style={{ marginBottom: 20 }}
          placeholder="Nome da turma"
          onChangeText={setGroup}
          onSubmitEditing={handleNew}
          returnKeyType='done'
        />
        <Button
          title="Criar"
          onPress={handleNew}
        />
      </S.Content>
    </S.Container>
  );
}