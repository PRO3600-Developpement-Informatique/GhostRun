import React from 'react';
import ReactNativeSettingsPage, {
  SectionRow,
  NavigateRow,
  CheckRow,
  SwitchRow,
  SliderRow,
} from 'react-native-settings-page';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
export default class PageOptions extends React.Component {
  state = {
    check: false,
    switch: false,
    value: 40,
  };

  render() {
    return (
      <ReactNativeSettingsPage>
        <SectionRow text="Options">
          <SwitchRow
            text="Thème sombre"
            iconName="your-icon-name"
            _value={this.state.switch}
            _onValueChange={() => {
              this.setState({switch: !this.state.switch});
            }}
          />
          <CheckRow
            text="CheckRow"
            iconName="your-icon-name"
            _color="#000"
            _value={this.state.check}
            _onValueChange={() => {
              this.setState({check: !this.state.check});
            }}
          />
          <SliderRow
            text="Slider Row"
            iconName="your-icon-name"
            _color="#000"
            _min={0}
            _max={100}
            _value={this.state.value}
            _onValueChange={value => {
              this.setState({value});
            }}
          />
        </SectionRow>
      </ReactNativeSettingsPage>
    );
  }
}
