const MailExtraComponent = ({ props }) => {
  const { ExtraRef } = props;
  console.log(props);
  console.log(ExtraRef);
  return (
    <div
      className="fixed left-0 top-0 size-full bg-black opacity-20 z-[200]"
      ref={ExtraRef}
      onKeyDown={(evt) => {
        console.log(evt);
      }}
    ></div>
  );
};
export default MailExtraComponent;
