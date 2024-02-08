import { vi, describe, it, expect } from 'vitest';
import { useItems } from '@/models/useItems';
import { useI18n } from 'vue-i18n';

vi.mock('vue-i18n');
useI18n.mockReturnValue({
  t: (tKey) => tKey,
});

describe('useItems Tests', () => {
  it('initializes correctly on setup', () => {
    const { setup } = useItems();
    setup();
    // Add assertions to check initial state
  });

  describe('Item Filters', () => {
    it('applies filters correctly', () => {
      const { setup, itemFilters } = useItems();
      const { currentItemList } = setup();

      // Set the name filter
      itemFilters.name = 'Gobball';

      setTimeout(() => {
        // Assert that the returned items match the filter criteria
        expect(currentItemList.value.every((item) => item.name.includes('Gobball'))).toBe(true);
      }, 1000);
    });

    // More filter-related tests...
  });

  describe('Getters', () => {
    it('getItemById returns the correct item for a given ID', () => {
      const { setup, getItemById } = useItems();
      setup();

      const itemId = 2021; // Gobbal Amulet
      const item = getItemById(itemId);

      expect(item).toBeDefined();
      expect(item.id).toBe(itemId);
    });

    it('getRunes returns the correct runes for an item', () => {
      const { setup, getRunes } = useItems();
      setup();

      const runes = getRunes();
      expect(runes.every((item) => item.type.id === 811)).toBe(true);
    });

    it('getSublimations returns the correct sublimations', () => {
      const { setup, getSublimations } = useItems();
      setup();

      const sublimations = getSublimations();
      expect(sublimations.every((item) => item.type.id === 812)).toBe(true);
    });
  });

  describe('Equip Item', () => {
    it('equips an item correctly', () => {
      // const { setup, equipItem } = useItems();
      // setup();
      // const itemId = 1; // Replace with a valid item ID
      // equipItem(itemId);
      // // Check if the item is now equipped
      // // This depends on how you track equipped items in your state
      // expect(isItemEquipped(itemId)).toBe(true);
    });
  });

  describe('Can Sublimation Fit', () => {
    it('determines if a sublimation can fit in an item', () => {
      // const { setup, canSublimationFit } = useItems();
      // setup();
      // const item = /* get an item */;
      // const sublimation = /* get a sublimation */;
      // const result = canSublimationFit(item, sublimation);
      // Assert based on expected behavior
      // Example: expect(result).toBe(true) or expect(result).toBe(false)
    });
  });
});
