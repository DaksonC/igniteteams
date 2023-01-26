import { AppError } from '@utils/AppError';
import { PlayerStorageDTO } from './playerStorageDTO';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import AsyncSrorage from '@react-native-async-storage/async-storage';
import { playersGetByGroup } from './playersGetByGroup';

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  try {
    const storedPlayer = await playersGetByGroup(group);

    const playerExists = storedPlayer.filter(player => player.name === newPlayer.name);

    if (playerExists.length > 0) {
      throw new AppError('Esse jogador já existe.');
    }

    const storage = JSON.stringify([...storedPlayer, newPlayer]);

    await AsyncSrorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);

  } catch (error) {
    throw error;
  }
}
