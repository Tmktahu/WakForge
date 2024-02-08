import { expect, test, describe, vi } from 'vitest';
import { masterData, useStorage, LOCALSTORAGE_KEY } from '@/models/useStorage';
import { useI18n } from 'vue-i18n';
import { useBuildCodes } from '@/models/useBuildCodes';

vi.mock('vue-i18n');
useI18n.mockReturnValue({
  t: (tKey) => tKey,
});

// vi.mock('@/models/useBuildCodes', async () => {
//   const actual = await vi.importActual('@/models/useBuildCodes');
//   const stuff = thing.useBuildCodes();

//   // useBuildCodes.mockReturnValue({
//   //   ...stuff,
//   //   decodeBuildCode: (buildCode) => {},
//   // });

//   return {
//     ...actual,
//   };
// });

describe('useStorage Tests', () => {
  // reads data from local storage and sets it to masterData if it exists
  test('should read data from local storage and set it to masterData', async () => {
    vi.mock('@/models/useBuildCodes');
    useBuildCodes.mockReturnValue({
      decodeBuildCode: (buildCode) => {},
      parseBuildData: (buildData) => {},
    });

    // Arrange
    const localStorageData = {
      appVersion: '2.5',
      storageVersion: '0.0.6',
      characters: [{ id: '1', name: 'Character 1', buildCode: 'ಡƸɈНটΏʩॳÌსΏØ' }],
      uiTheme: 'dark',
      language: 'en',
      groups: ['group1', 'group2'],
    };
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(JSON.stringify(localStorageData)),
    };
    global.window = {
      localStorage: localStorageMock,
    };

    // Act
    const { setup } = useStorage();
    const { masterData } = await setup();

    // Assert
    expect(masterData.appVersion).toBe(localStorageData.appVersion);
    expect(masterData.storageVersion).toBe(localStorageData.storageVersion);
    // expect(masterData.characters).toEqual(localStorageData.characters);
    expect(masterData.uiTheme).toBe(localStorageData.uiTheme);
    expect(masterData.language).toBe(localStorageData.language);
    expect(masterData.groups).toEqual(localStorageData.groups);
  });

  // handles live saving to local storage using watch and debounce
  //   test('should handle live saving to local storage using watch and debounce', async () => {
  //     const localStorageData = {
  //       appVersion: '1.0.0',
  //       storageVersion: '0.0.5',
  //       characters: [{ id: '1', name: 'Character 1' }],
  //       uiTheme: 'dark',
  //       language: 'en',
  //       groups: ['group1', 'group2'],
  //     };
  //     // Arrange
  //     const localStorageMock = {
  //       getItem: vi.fn().mockReturnValue(JSON.stringify(localStorageData)),
  //       setItem: vi.fn(),
  //     };
  //     global.window = {
  //       localStorage: localStorageMock,
  //     };
  //     const { setup } = useStorage();
  //     await setup();

  //     // Act
  //     masterData.appVersion = '1.0.0';
  //     await new Promise((resolve) => setTimeout(resolve, 200));

  //     // Assert
  //     expect(localStorageMock.setItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY, JSON.stringify(masterData, null, 2));
  //   });
});
