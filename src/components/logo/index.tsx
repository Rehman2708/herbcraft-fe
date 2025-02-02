import "./style.scss";
const LogoText = ({ size }: { size?: number }) => {
  return (
    <div className="fullText" style={size ? { fontSize: `${size}px` } : {}}>
      <h3 className="text leftText">Herb</h3>
      <h3 className="text rightText">Craft</h3>
    </div>
  );
};

export default LogoText;
