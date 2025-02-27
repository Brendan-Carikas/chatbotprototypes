
const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 p-2">
      <div className="flex space-x-1 h-3">
      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-[bounce_1.4s_infinite_0.2s]" />
      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-[bounce_1.4s_infinite_0.4s]" />
      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-[bounce_1.4s_infinite_0.6s]" />
    </div>
    </div>
  );
};

export default TypingIndicator;
