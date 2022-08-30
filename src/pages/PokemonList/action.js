export function catchPokemon(data, cbSuccess, cbFailed) {
  return {
    type: 'CATCH',
    data,
    cbSuccess,
    cbFailed
  };
}

export function setRenamePokemon(setName) {
  return {
    type: 'SET_NAME',
    setName
  }
}

export function setCatchPokemon(setCatch) {
  return {
    type: 'SET_CATCH',
    setCatch
  }
}

export function setReleasePokemon(setRelease) {
  return {
    type: 'SET_RELEASE',
    setRelease
  }
}

export function renamePokemon(data, cbSuccess, cbError) {
  return {
    type: 'RENAME',
    data,
    cbSuccess,
    cbError
  };
}

export function releasePokemon(data, cbSuccess, cbFailed) {
  return {
    type: 'RELEASE',
    data,
    cbSuccess,
    cbFailed
  };
}