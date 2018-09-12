import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';

import {toggleModalAction} from './redux/actions/modalActions'

import AudioController from './containers/AudioController'
import About from './components/about/About'

import Modal from 'react-modal';

Modal.setAppElement('#root');

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(64, 64, 64, 0.75)',
  },
  content: {
    backgroundColor: 'rgba(255,0,0,1)',
    padding: '0',
    top: '240px',
    right: '240px',
    left: '240px',
    bottom: '240px',
    minWidth: '400px',
    minHeight: '200px',
  }
}

class App extends Component {

  closeModal = () => {
    this.props.toggleModalAction()
  }

  render() {
    return (
      <div className="App">
        <Modal
          isOpen={this.props.modalOpen}
          style={modalStyle}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          onRequestClose={this.closeModal}
          closeTimeoutMS={150}
          >
            <About
              closeModal={this.closeModal}
            />
        </Modal>
        <AudioController />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modalOpen: state.modalOpen
  }
}
function mapDispatchToProps(dispatch) {
  return {
    toggleModalAction: () => dispatch(toggleModalAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
