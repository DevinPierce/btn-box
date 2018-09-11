export function saveSettingsAction(name, settings) {
  return {
    type: 'SAVE_SETTINGS',
    payload: {
      name,
      settings
    }
  }
}
export function deleteSettingsAction(id) {
  return {
    type: 'DELETE_SETTINGS',
    payload: {
      id
    }
  }
}
