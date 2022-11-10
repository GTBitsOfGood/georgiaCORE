const ProgressBar = (props) => {
    const { bgcolor, completed, width } = props;
  
    const containerStyles = {
      height: 10,
      width: `${width}px`,
      backgroundColor: "#5B794E",
      margin: 50,
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      transition: 'width 1s ease-in-out',
      borderRadius: 'inherit',
      textAlign: 'right',
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold',
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
        </div>
      </div>
    );
  };

  export default ProgressBar 