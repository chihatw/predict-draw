const Header: React.FC<{
  backgroundColor: string;
  height: number;
  label?: string;
}> = ({ height, backgroundColor, label }) => {
  return (
    <div
      style={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
      }}
    >
      <span
        style={{
          color: 'white',
          fontSize: height / 3,
          fontWeight: 'bold',
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default Header;
