import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

const DURATION_SHORT = 4;
const DURATION_MEDIUM = 7;
const DURATION_LONG = 10;

class Snackbar extends Component {
  static DURATION_SHORT = DURATION_SHORT;
  static DURATION_MEDIUM = DURATION_MEDIUM;
  static DURATION_LONG = DURATION_LONG;

  static defaultProps = {
    duration: DURATION_SHORT,
    onClose: () => {},
    style: {},
    type: 'default',
    borderColor: null,
    actionTextColor: null,
    contentStyle: {},
    position: 'bottom',
    borderWidth: 4,
    margin: 0,
  };

  state = {
    opacity: new Animated.Value(0.0),
    transform: new Animated.Value(0.9),
    snackVisible: false,
  };

  componentDidMount() {
    this._show();
  }

  componentDidUpdate(oldProps) {
    if (
      oldProps.prepareUnmount !== this.props.prepareUnmount &&
      this.props.prepareUnmount
    ) {
      this._hide();
    }
  }

  componentWillUnmount() {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }
  }

  _show = () => {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }
    this.setState({
      snackVisible: true,
    });
    Animated.parallel([
      Animated.timing(this.state.transform, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        const {duration} = this.props;
        const isInfinity =
          duration === Number.POSITIVE_INFINITY ||
          duration === Number.NEGATIVE_INFINITY;

        if (finished && !isInfinity) {
          this._hideTimeout = setTimeout(() => this._hide(), duration * 1000);
        }
      }
    });
  };

  _hide = () => {
    const {onClose, onAnimationEnd} = this.props;
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }

    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        this.setState({snackVisible: false});
      }
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    });

    if (onClose) {
      onClose();
    }
  };

  _hideTimeout = 0;

  _handleOnPress = () => {
    this.props.action.onPress();
    this._hide();
  };

  render() {
    const {
      content,
      action,
      style,
      type,
      margin,
      borderColor,
      actionTextColor,
      contentStyle,
      borderWidth,
      position,
      theme,
    } = this.props;
    const typeBorderColor = borderColor
      ? borderColor
      : type === 'info'
      ? '#1890ff'
      : type === 'success'
      ? '#4CAF50'
      : type === 'error'
      ? '#f5222d'
      : type === 'warning'
      ? '#faad14'
      : 'transparent';

    const typeBorderWidth = type === 'default' ? 0 : borderWidth;

    return (
      <SafeAreaView
        pointerEvents="box-none"
        style={[styles.wrapper, {[position]: margin ? margin : 0}]}>
        <Animated.View
          pointerEvents="box-none"
          accessibilityLiveRegion="polite"
          style={{
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.transform,
              },
            ],
          }}>
          <View
            pointerEvents="box-none"
            style={[
              styles.container,
              {
                backgroundColor: theme === 'light' ? '#ffffff' : '#212121',
                borderRadius: 4,
                borderLeftColor: typeBorderColor,
                borderLeftWidth: typeBorderWidth,
              },
              style,
            ]}>
            {typeof content === 'string' ? (
              <Text
                style={[
                  styles.content,
                  contentStyle,
                  {
                    color:
                      theme === 'light'
                        ? 'rgba(0,0,0,0.87)'
                        : 'rgba(255,255,255, 0.87)',
                  },
                ]}>
                {content}
              </Text>
            ) : (
              <View
                style={[
                  styles.content,
                  contentStyle,
                  {
                    color:
                      theme === 'light'
                        ? 'rgba(0,0,0,0.87)'
                        : 'rgba(255,255,255, 0.87)',
                  },
                ]}>
                {content}
              </View>
            )}
            {action ? (
              <TouchableOpacity
                onPress={this._handleOnPress}
                style={styles.button}
                compact
                mode="text">
                <Text
                  style={{
                    color: actionTextColor
                      ? actionTextColor
                      : theme === 'light'
                      ? 'rgba(0,0,0,0.87)'
                      : 'rgba(255,255,255, 0.87)',
                  }}>
                  {action.label.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    maxWidth: 420,
  },
  container: {
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    minHeight: 48,
  },
  content: {
    marginHorizontal: 16,
    marginVertical: 8,
    flexWrap: 'wrap',
    flex: 1,
  },
  button: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginHorizontal: 8,
    marginVertical: 6,
  },
});

export default Snackbar;
