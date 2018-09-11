import React from 'react';

import Select from 'react-select';

import { connect } from 'react-redux';

import {saveSettingsAction,
  deleteSettingsAction,
} from '../../../redux/actions/saveLoadDeleteActions'
import {toggleTextInputFocusAction} from '../../../redux/actions/textInputFocusActions'

class SaveSettings extends React.Component {

  state = {
    name: '',
    selected: null
  }

  selectOptions = () => {
    return this.props.savedSettings.map(setting => {
      return {value: setting.id, label: setting.name}
    })
  }

  handleSave = () => {
    if (this.state.name !== ''){
      this.props.saveSettingsAction(this.state.name, this.props.audioSettings)
      // BUG: saving selects the previously created (second to last) setting, instead of the newly created one
      // const newSetting = this.props.savedSettings[this.props.savedSettings.length - 1]
      this.setState({
        name: '',
        selected: null
      })
    }
  }
  handleLoad = (event) => {
    this.setState({
      selected: event
    }, ()=>{
      const settings = this.props.savedSettings.find(setting => setting.id === this.state.selected.value).settings
      this.props.loadSettings(settings)
    })
  }
  handleDelete = () => {
    if (this.state.selected){
      this.props.deleteSettingsAction(this.state.selected.value)
      this.setState({
        selected: null
      })
    }
  }

  handleTextChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFocusBlur = () => {
    this.props.toggleTextInputFocusAction()
  }

  render(){
    return (
      <div id="save-settings">
        <Select
          className="settings-select save-settings-element"
          options={this.selectOptions()}
          onChange={(event)=>this.handleLoad(event)}
          isDisabled={this.props.savedSettings.length > 0 ? false : true}
          placeholder="Select a settings profile"
          value={this.state.selected}
        />
        <button
          id="delete-btn"
          className="save-settings-element"
          onClick={this.handleDelete}
        >Delete</button>
        <input
          id="text-input"
          className="save-settings-element"
          type="text"
          name="name"
          placeholder="Name this settings profile"
          onChange={(event)=>this.handleTextChange(event)}
          onFocus={this.handleFocusBlur}
          onBlur={this.handleFocusBlur}
          value={this.state.name}
        />
        <button
          id="save-btn"
          className="save-settings-element"
          onClick={this.handleSave}
          >Save</button>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    savedSettings: state.savedSettings,
    audioSettings: state.audioSettings,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    saveSettingsAction: (name, settings) => dispatch(saveSettingsAction(name, settings)),
    deleteSettingsAction: (id) => dispatch(deleteSettingsAction(id)),
    toggleTextInputFocusAction: () => dispatch(toggleTextInputFocusAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveSettings)
