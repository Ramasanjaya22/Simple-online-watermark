const KofiButton: React.FC = () => {
  return (
    <a
      href="https://ko-fi.com/Y8Y7118OI4"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 bg-[#29abe0] hover:bg-[#1a8dbb] text-white font-medium rounded-lg transition-colors duration-200 ease-in-out"
    >
      <img
        src="https://storage.ko-fi.com/cdn/cup-border.png"
        alt="Ko-fi donations"
        className="h-6 w-6 mr-2"
      />
      Support me on Ko-fi
    </a>
  );
};

export default KofiButton;