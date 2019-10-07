import React from 'react';
import {View, StyleSheet} from 'react-native';

/**
 * Portal host is the component which actually renders all Portals.
 */
export default class PortalManager extends React.PureComponent {
  state = {
    portals: [],
  };
  mount = async (key, children) => {
    if (this.state.portals.length) {
      const newPortals = this.state.portals.map(portal => {
        portal.children = React.cloneElement(portal.children, {
          prepareUnmount: true,
        });
        return portal;
      });

      this.setState(
        {
          portals: newPortals,
        },
        () => {
          setTimeout(() => {
            this.setState({
              portals: [{key, children}],
            });
          }, 150); // Awaiting prev snack to hide
        },
      );
    } else {
      this.setState({
        portals: [{key, children}],
      });
    }
  };
  update = (key, children) =>
    this.setState(state => ({
      portals: state.portals.map(item => {
        if (item.key === key) {
          return {...item, children};
        }
        return item;
      }),
    }));
  unmount = key =>
    this.setState(state => ({
      portals: state.portals.filter(item => item.key !== key),
    }));
  render() {
    return this.state.portals.map(({key, children}, i) => (
      <View
        key={key}
        collapsable={
          false /* Need collapsable=false here to clip the elevations, otherwise they appear above sibling components */
        }
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, {zIndex: 1000 + i}]}>
        {children}
      </View>
    ));
  }
}
