export default function(component, key) {
  return (e) => {
    component.setState({[key]: e});
  };
}

