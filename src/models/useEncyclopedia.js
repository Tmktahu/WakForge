import { ITEM_SLOT_DATA } from '@/models/useConstants';

export const useEncyclopedia = () => {
  // this stuff is here to handle generating the URLs for encyclopedia pages
  // because they are annoying

  // ARMOR PATTERN
  // https://www.wakfu.com/en/mmorpg/encyclopedia/armors/26313-horned-headgear
  // https://www.wakfu.com/en/mmorpg/encyclopedia/armors/itemid-name-hyphen-separated

  // WEAPON PATTERN
  // https://www.wakfu.com/en/mmorpg/encyclopedia/weapons/29478-mysterious-blade
  // https://www.wakfu.com/en/mmorpg/encyclopedia/weapons/itemid-name-hyphen-separated

  // PETS PATTERN
  // https://www.wakfu.com/en/mmorpg/encyclopedia/pets/14152-arachnee
  // https://www.wakfu.com/en/mmorpg/encyclopedia/pets/itemid-name-hyphen-separated

  // MOUNTS PATTERN
  // https://www.wakfu.com/en/mmorpg/encyclopedia/mounts/20811-dragominus
  // https://www.wakfu.com/en/mmorpg/encyclopedia/mounts/itemid-name-hyphen-separated

  // ACCESSORIES PATTERN (emblems, tools, torches)
  // https://www.wakfu.com/en/mmorpg/encyclopedia/accessories/29447-impure-iv-emblem
  // https://www.wakfu.com/en/mmorpg/encyclopedia/accessories/itemid-name-hyphen-separated

  const getItemEncyclopediaUrl = (item) => {
    let itemPageId = generateItemPageId(item);
    let baseUrl = 'https://www.wakfu.com/en/mmorpg/encyclopedia';
    let finalURL = '';

    if (item.type.validSlots.includes(ITEM_SLOT_DATA.FIRST_WEAPON.id) || item.type.validSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id)) {
      // we are dealing with weapons
      finalURL = `${baseUrl}/weapons/${itemPageId}`;
    } else if (item.type.validSlots.includes(ITEM_SLOT_DATA.PET.id)) {
      // we are dealing with pets
      finalURL = `${baseUrl}/pets/${itemPageId}`;
    } else if (item.type.validSlots.includes(ITEM_SLOT_DATA.MOUNT.id)) {
      // we are dealing with mounts
      finalURL = `${baseUrl}/mounts/${itemPageId}`;
    } else if (item.type.validSlots.includes(ITEM_SLOT_DATA.ACCESSORY.id)) {
      // we are dealing with accessories
      finalURL = `${baseUrl}/accessories/${itemPageId}`;
    } else {
      // otherwise we are dealing with some kind of armor
      finalURL = `${baseUrl}/armors/${itemPageId}`;
    }

    return finalURL;
  };

  const generateItemPageId = (item) => {
    let id = item.id;
    let hyphenedName = item.name.toLowerCase().replace(' ', '-');
    return `${id}-${hyphenedName}`;
  };

  return {
    getItemEncyclopediaUrl,
  };
};
