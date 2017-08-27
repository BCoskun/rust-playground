import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Configuration from './Configuration';
import Header from './Header';
import Editor from './Editor';
import Output from './Output';
import { VerticalSplitter, HorizontalSplitter } from './Splitter';

function ConfigurationModal() {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <Configuration  />
      </div>
    </div>
  );
}

class Playground extends React.Component {
  render() {
    const { showConfig, focus, splitOrientation } = this.props;

    const config = showConfig ? <ConfigurationModal /> : null;
    const outputFocused = focus ? 'playground-output-focused' : '';
    const splitClass = 'playground-split';
    const orientation = splitClass + '-' + splitOrientation;

    return (
      <div>
        { config }
        <div className="playground">
          <div className="playground-header">
            <Header />
          </div>
          <div className={`xxx xxx--${splitOrientation}`}>
            <div className="xxx__horizontal">
              <HorizontalSplitter>
                <div className="playground-editor">
                  <Editor />
                </div>
                <div className={`playground-output ${outputFocused}`}>
                  <Output />
                </div>
              </HorizontalSplitter>
            </div>
            <div className="xxx__vertical">
              <VerticalSplitter>
                <div className="playground-editor">
                  <Editor />
                </div>
                <div className={`playground-output ${outputFocused}`}>
                  <Output />
                </div>
              </VerticalSplitter>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, _prevState) {
    if (this.props.focus !== prevProps.focus) {
      // Inform the ACE editor that its size has changed.
      try {
        window.dispatchEvent(new Event('resize'));
      } catch (ex) {
        // IE 11
        const evt = window.document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
      }
    }
  }
}

Playground.propTypes = {
  focus: PropTypes.string,
  showConfig: PropTypes.bool.isRequired,
  splitOrientation: PropTypes.string.isRequired,
};

const mapStateToProps = ({ configuration: { shown: showConfig, orientation: splitOrientation }, output: { meta: { focus } } }) => (
  { showConfig, focus, splitOrientation }
);

const ConnectedPlayground = connect(
  mapStateToProps
)(Playground);

export default ConnectedPlayground;
