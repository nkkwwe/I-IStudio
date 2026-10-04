import { useCallback, useEffect, useLayoutEffect, useRef, useState, type UIEvent } from 'react';
import type { ChatMessage } from '../Components/InquiryChat/types';

function layoutTop(element: HTMLElement): number {
  let top = 0;
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  return top;
}

export function useInquiryChatScroll(messages: ChatMessage[], loading: boolean, firstUnreadMessageId: number | null, inputValue: string, editing: boolean) {
  const messagesRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLFormElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const followBottomRef = useRef(true);
  const initialScrollRef = useRef(true);
  const lastScrollTopRef = useRef(0);
  const dateHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dateVisible, setDateVisible] = useState(false);
  const [floatingDates, setFloatingDates] = useState<string[]>([]);

  const scrollToBottom = useCallback(() => {
    const list = messagesRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
    lastScrollTopRef.current = list.scrollTop;
  }, []);

  const updateFloatingDates = useCallback(() => {
    const list = messagesRef.current;
    if (!list) return;
    const keys = Array.from(list.querySelectorAll<HTMLElement>('.inquiry-chat-day')).filter((day) => {
      const date = day.querySelector<HTMLElement>('.inquiry-chat-date');
      return date && date.getBoundingClientRect().top > day.getBoundingClientRect().top + 1;
    }).map((day) => day.dataset.day!);
    setFloatingDates((previous) => previous.join('|') === keys.join('|') ? previous : keys);
  }, []);

  const resizeInput = useCallback(() => {
    const input = messageInputRef.current;
    if (!input) return;
    const style = window.getComputedStyle(input);
    const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const maxHeight = parseFloat(style.lineHeight) * 6 + padding + border;
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight + border, maxHeight)}px`;
    input.style.overflowY = input.scrollHeight + border > maxHeight ? 'auto' : 'hidden';
  }, []);

  useLayoutEffect(resizeInput, [inputValue, editing, resizeInput]);

  useLayoutEffect(() => {
    const composer = composerRef.current;
    const list = messagesRef.current;
    if (!composer || !list) return;
    let frame = 0;
    const updateInset = () => {
      const height = `${composer.offsetHeight}px`;
      if (list.style.getPropertyValue('--chat-composer-height') !== height) {
        list.style.setProperty('--chat-composer-height', height);
      }
      if (followBottomRef.current && !initialScrollRef.current) scrollToBottom();
    };
    updateInset();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateInset);
    });
    observer.observe(composer);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [scrollToBottom]);

  useEffect(() => {
    const input = messageInputRef.current;
    if (!input) return;
    let width = input.clientWidth;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      const nextWidth = input.clientWidth;
      if (nextWidth === width) return;
      width = nextWidth;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(resizeInput);
    });
    observer.observe(input);
    window.addEventListener('resize', resizeInput);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resizeInput);
    };
  }, [resizeInput]);

  const lastMessageId = messages.at(-1)?.id;
  useLayoutEffect(() => {
    const list = messagesRef.current;
    if (loading || !list) return;
    if (initialScrollRef.current) {
      const unread = firstUnreadMessageId === null ? null : list.querySelector<HTMLElement>('[data-unread-boundary]');
      if (unread) {
        // Layout offsets stay stable while the modal's opening scale is running.
        list.scrollTop = layoutTop(unread) - layoutTop(list) - 40;
        lastScrollTopRef.current = list.scrollTop;
        followBottomRef.current = list.scrollHeight - list.scrollTop - list.clientHeight <= 2;
      } else {
        scrollToBottom();
      }
      initialScrollRef.current = false;
    } else if (followBottomRef.current) {
      scrollToBottom();
    }
    updateFloatingDates();
  }, [lastMessageId, loading, firstUnreadMessageId, scrollToBottom, updateFloatingDates]);

  useLayoutEffect(() => {
    updateFloatingDates();
    const list = messagesRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => {
      if (followBottomRef.current && !initialScrollRef.current) scrollToBottom();
      updateFloatingDates();
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [messages, loading, scrollToBottom, updateFloatingDates]);

  useEffect(() => () => {
    if (dateHideTimerRef.current !== null) clearTimeout(dateHideTimerRef.current);
  }, []);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const list = event.currentTarget;
    updateFloatingDates();
    if (Math.abs(list.scrollTop - lastScrollTopRef.current) < 1) return false;
    lastScrollTopRef.current = list.scrollTop;
    followBottomRef.current = list.scrollHeight - list.scrollTop - list.clientHeight <= 2;
    setDateVisible(true);
    if (dateHideTimerRef.current !== null) clearTimeout(dateHideTimerRef.current);
    dateHideTimerRef.current = setTimeout(() => setDateVisible(false), 10000);
    return true;
  };

  return { messagesRef, composerRef, messageInputRef, followBottomRef, scrollToBottom, handleScroll, dateVisible, floatingDates };
}
