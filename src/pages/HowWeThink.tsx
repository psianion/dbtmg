const HowWeThinkModal = ({
  setIsModalOpen
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const closeModal = () => setIsModalOpen(false);
  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-100'
      onClick={closeModal}
    >
      <div className='w-full h-screen bg-white p-4'></div>
    </div>
  );
};

export default HowWeThinkModal;
