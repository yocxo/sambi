import type { AI } from '#/lib/chat/actions';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { useActions, useUIState } from 'ai/rsc';
import { nanoid } from 'nanoid';
import Textarea from 'react-textarea-autosize';

import { Button } from '@yocxo/ui/button';
import { ArrowElbowIcon, PlusIcon } from '@yocxo/ui/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@yocxo/ui/tooltip';

import { useEnterSubmit } from '#/lib/hooks/use-enter-submit';

import { UserMessage } from './stocks/message';

export function PromptForm({
  input,
  setInput,
}: {
  input: string;
  setInput: (value: string) => void;
}) {
  const router = useRouter();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState<typeof AI>();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      ref={formRef}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={async (e: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        e.preventDefault();

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          e.target.message?.blur();
        }

        const value = input.trim();
        setInput('');
        if (!value) return;

        // Optimistically add user message UI
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>,
          },
        ]);

        // Submit and get response message
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const responseMessage = await submitUserMessage(value);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        setMessages((currentMessages) => [...currentMessages, responseMessage]);
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-[20px] size-6 rounded-full p-0 sm:left-4 md:top-[14px] md:size-8"
              onClick={() => {
                router.push('/new');
              }}
            >
              <PlusIcon />
              <span className="sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Message Coco about stonks..."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={input === ''}>
                <ArrowElbowIcon />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
