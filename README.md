# React Native Snackbar Material

React Native Snackbar build with Material Guidelines.

<img src="https://user-images.githubusercontent.com/11463030/66312923-22932180-e91a-11e9-881e-da7b89d84fa8.gif" width="300" alt="Common">

## Installation

`$ npm install react-native-snackbar-material --save`

## Usage

Inside your main app.js file define a snackbar provider

```js
import { SnackProvider } from 'react-native-snackbar-reddit';

export default class App extends Component {
  render() {
    return (
      <SnackProvider>
        {...}
      </SnackProvider>
    );
  }
}
```

Now you can use Snackbar inside any component of SnackProvider. 
Default method is Snackbar.show() - Without any border, default material snackbar.
There are 4 types of snackbar with different border colors: `Snackbar.info()`, `Snackbar.error()`, `Snackbar.success()`, `Snackbar.warning()`

```js
import { Snackbar } from "react-native-snackbar-reddit";

export default class ExampleComponent extends Component {

 handleDefaultSnackbar = () => {
    Snackbar.show({
      content: "Info Snackbar Content"
    });
  };
  
  handleInfoSnackbar = () => {
    Snackbar.info({
      content: "Info Snackbar Content"
    });
  };

  handleErrorSnackbar = () => {
    Snackbar.error({
      content: "Error Snackbar Content",
      duration: 5,
      action: {
        onPress: () => console.warn("Action Pressed"),
        label: "Action"
      },
      onClose: () => console.warn("Snackbar close"),
      theme: 'light',
      margin: 52,
      position: 'top',
    });
  };

  handleSuccessSnackbar = () => {
    Snackbar.success({
      content: "Success Snackbar Content"
    });
  };

  handleWarningSnackbar = () => {
    Snackbar.warning({
      content: "Warning Snackbar Content"
    });
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleInfoSnackbar}>
          <Text>Info Snack</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleErrorSnackbar}>
          <Text>Error Snack</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSuccessSnackbar}>
          <Text>Success Snack</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleWarningSnackbar}>
          <Text>Warning snack</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
```

### Properties for all snackbars

Content is required prop, every other prop is optional

| Prop                  | Description                                                  | Default    |
| --------------------- | ------------------------------------------------------------ | ---------- |
| **`content`**         | Content of Snackbar. Can be string or Component. Required                                | _None_     |
| **`duration`**        | Delay time to close Snackbar (in seconds)                     | `4`        |
| **`action`**          | Sets action for snackbar ( action: { onPress: () => {}, label: "Some button label" })         | `{}`       |
| **`onClose`**         | A callback function Triggered when the Snackbar is closed    | `() => {}` |
| **`actionTextColor`** | Custom action button text color                              | `#757575`  |
| **`contentStyle`**    | Style object for snackbar text styling                       | `{}`       |
| **`margin`**          | Margin from top or bottom (depends on position of snackbar)  | `0`       |
| **`borderWidth`**     | Snackbar border width                                        | `0`        |
| **`borderColor`**     | Custom border color                                          |            |
| **`position`**        | Snackbar position. Values are "top" or "bottom"             | `bottom`   |
| **`theme`**   | Theme of snackbar for fast customisation. Values is "default" or "light"                        | `default`    |

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Alexander Bogdanov 2019
