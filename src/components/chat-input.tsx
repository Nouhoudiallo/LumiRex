import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const Input = ({
  inputProps,
  buttonProps,
}: {
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
  return (
    <div className="w-full bg-neutral-900 rounded-2xl p-4 shadow-lg max-w-3xl">
      <Textarea
        placeholder="Entrez votre question...."
        className="w-full resize-none"
        autoFocus
        {...inputProps}
      />

      <div className="flex items-center justify-between mt-2">
        <div />
        <Button
          type="submit"
          size={"icon"}
          className="rounded-full cursor-pointer"
          {...buttonProps}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Input