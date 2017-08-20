### Bootstrapping
```
/ $ metoer npm install
/ $ METEOR_OFFLINE_CATALOG=1 metoer
```

### Component Style Guide
```
export default class MyComponent extends Compoent {
  // set propTypes with 'static' keyword
  static propTypes = {
    text: PropTypes.string
  };
  
  // set defaultProps with 'static' keyword
  static defaultProps = {
    text: 'text'
  };

  constructor() {
    super();
    
    // initialization when constructed
  }
    
  state = {
    clickNumber: 0
  };
  
  animatedValue = new Animated.Value(0);
  
  componentDidMount() {
    // initialization when mounted
  }
  
  onPress = () => {
    this.setState((previousState) => {
      return {
        clickNumber: previousState.clickNumber + 1
      };
    });
  };
  
  render() {
    return (
      <View>
        <Text onPress={ this.onPress }>{ this.props.text }</Text>
      </View>
    );
  }
}
```
