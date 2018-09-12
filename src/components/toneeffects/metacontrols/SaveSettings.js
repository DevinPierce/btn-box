import React from 'react';

import Select from 'react-select';

import { connect } from 'react-redux';

import {saveSettingsAction,
  deleteSettingsAction,
} from '../../../redux/actions/saveLoadDeleteActions'
import {toggleTextInputFocusAction} from '../../../redux/actions/textInputFocusActions'

class SaveSettings extends React.Component {

  constructor(props){
    super(props)
    this.select = React.createRef()
    this.textInput = React.createRef()
    this.state = {
      name: '',
      selected: null
    }
  }


  selectOptions = () => {
    return this.props.savedSettings.map(setting => {
      return {value: setting.id, label: setting.name}
    })
  }

  handleSave = (event) => {
    event.preventDefault()
    if (this.state.name !== ''){
      this.props.saveSettingsAction(this.state.name, this.props.audioSettings)
      // BUG: saving selects the previously created (second to last) setting, instead of the newly created one
      // const newSetting = this.props.savedSettings[this.props.savedSettings.length - 1]
      this.setState({
        name: '',
        selected: null
      }, ()=>{this.textInput.current.blur()})
    }
  }
  handleLoad = (event) => {
    this.setState({
      selected: event
    }, ()=>{
      const settings = this.props.savedSettings.find(setting => setting.id === this.state.selected.value).settings
      this.props.loadSettings(settings)
      this.select.current.blur()
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

  handleMenuClose = () => {
    this.select.current.blur()
  }

  render(){
    return (
      <div id="save-settings">
        <Select
          ref={this.select}
          className="settings-select save-settings-element"
          options={this.selectOptions()}
          onChange={(event)=>this.handleLoad(event)}
          onMenuClose={this.handleMenuClose}
          isDisabled={this.props.savedSettings.length > 0 ? false : true}
          placeholder="Settings"
          value={this.state.selected}
        />
        <button
          id="delete-btn"
          className="save-settings-element save-delete-btn"
          onClick={this.handleDelete}
        >Delete</button>
        <form id="save-form" onSubmit={(event)=>this.handleSave(event)}>
          <input
            ref={this.textInput}
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
          <input
            id="save-btn"
            type="submit"
            className="save-settings-element save-delete-btn"
            value="Save"
          />
        </form>
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
