
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

function Button(props) {
  const { onClick, label, style, primary, secondary } = props;
  return (
    <RaisedButton
      onClick={onClick}
      label={label}
      labelPosition="before"
      primary={primary}
      secondary={secondary}
      style={style}
    />
  )
}

export default Button;

// <Button
//       label={'Start Program'}
//       style={styles.button}
//       onClick={this.props.runCode}
//     />


// import React from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
//
// const style = {
//   margin: 12,
// };
//
// const RaisedButtonExampleSimple = () => (
//   <div>
//     <RaisedButton label="Default" style={style} />
//     <RaisedButton label="Primary" primary={true} style={style} />
//     <RaisedButton label="Secondary" secondary={true} style={style} />
//     <RaisedButton label="Disabled" disabled={true} style={style} />
//     <br />
//     <br />
//     <RaisedButton label="Full width" fullWidth={true} />
//   </div>
// );
//
// export default RaisedButtonExampleSimple;
