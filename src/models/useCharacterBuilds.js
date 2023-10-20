import { ref } from 'vue';
import { useRoute } from 'vue-router';

export function useCharacterBuilds() {
  const currentBuildID = ref(null);
  const currentBuild = ref(null);
  const buildList = ref([]);
  let route = null;

  // TODO load in builds from local storage

  const setup = () => {
    route = useRoute();

    return {
      currentBuild,
      buildList,
    };
  };

  const setContext = () => {
    if (route.params?.buildId) {
      currentBuildID.value = decodeURIComponent(route.params?.assetUniqueId);
    }
  };

  return {
    setup,
    setContext,
  };
}
