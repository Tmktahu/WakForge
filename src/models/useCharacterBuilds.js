import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

export function useCharacterBuilds() {
  const currentBuildId = ref(null);
  const currentBuild = ref(null);
  const buildList = ref([]);
  let route = null;

  // TODO load in builds from local storage

  const setup = () => {
    route = useRoute();

    

    let dummyData = [
      {
        name: 'build 1 name',
        id: '1',
      },
      {
        name: 'build 2 name',
        id: '2',
      },
      {
        name: 'build 3 name',
        id: '3',
      }
    ];
    buildList.value = dummyData;

    watch(currentBuildId, () => {
      if(currentBuildId.value) {
        currentBuild.value = buildList.value.find((build) => build.id === currentBuildId.value);
      }
    });

    return {
      currentBuild,
      buildList,
    };
  };

  const setContext = () => {
    if (route.params?.buildId) {
      currentBuildId.value = route.params.buildId;
    }
  };

  return {
    setup,
    setContext,
  };
}
