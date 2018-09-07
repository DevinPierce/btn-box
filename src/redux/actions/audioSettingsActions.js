export function changeMasterVolumeAction(value) {
  return {
    type: 'CHANGE_MASTER_VOLUME',
    value
  }
}

export function changeEffectValueAction(effect, setting, value) {
  return {
    type: 'CHANGE_EFFECT_VALUE',
    effect,
    setting,
    value
  }
}

export function changeWaveformAction(waveform) {
  return {
    type: 'CHANGE_WAVEFORM',
    waveform
  }
}

export function changeFilterTypeAction(filterType) {
  return {
    type: 'CHANGE_FILTER_TYPE',
    filterType
  }
}
