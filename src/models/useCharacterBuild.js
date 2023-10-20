export function useCharacterBuild() {
    const currentBuild = ref(null);

    return {
        currentBuild
    }
}