import { useEffect, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Message = { id: string; role: 'user' | 'assistant'; message: string };
const sessionKey = 'saffron-stones-concierge-session';
const starterMessage: Message = { id: 'welcome', role: 'assistant', message: 'Welcome to Saffron & Stones. Ask me about our menu, timings, private halls, reservations, or dietary options.' };
const prompts = ['What are your opening hours?', 'Do you have vegetarian dishes?', 'Tell me about private events'];

function answerQuestion(question: string): string {
  const text = question.toLowerCase();
  if (text.includes('hour') || text.includes('open') || text.includes('time')) return 'We are closed on Mondays. Tuesday to Thursday we serve from 5pm to 10pm, Friday and Saturday from 4pm to 11pm, and Sunday from 4pm to 9pm.';
  if (text.includes('veg') || text.includes('vegetarian')) return 'Yes. We have a generous vegetarian menu with tandoor vegetables, paneer dishes, dals, biryani, breads, and seasonal sides. Tell us about allergies in your reservation notes.';
  if (text.includes('event') || text.includes('hall') || text.includes('party')) return 'We have four event spaces, from the intimate Chef’s Table for 24 guests to The Stone Hall for up to 120. Visit Event Halls or enquire through the reservation form.';
  if (text.includes('reserve') || text.includes('table') || text.includes('book')) return 'You can reserve a table using the form below. Choose your date, time, and guest count, and our team will confirm the request.';
  if (text.includes('address') || text.includes('where') || text.includes('location')) return 'We are at Sanjay Palace, Sanjay Place, Civil Lines, Agra, Uttar Pradesh 282002.';
  if (text.includes('delivery') || text.includes('takeaway')) return 'Takeaway and delivery orders are available. For a fresh tandoor experience, we recommend enjoying the dishes at the restaurant when possible.';
  if (text.includes('spice') || text.includes('allerg') || text.includes('gluten')) return 'Our team can guide you through spice levels and common allergens. Please add your requirements to a reservation or speak with us before ordering.';
  return 'I can help with our menu, opening hours, vegetarian options, private events, reservations, location, takeaway, and dietary questions.';
}

export default function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([starterMessage]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedSession = window.localStorage.getItem(sessionKey) || crypto.randomUUID();
    window.localStorage.setItem(sessionKey, storedSession);
    const loadMessages = async () => {
      const { data } = await supabase.from('restaurant_ai_messages').select('id, role, message').eq('session_id', storedSession).order('created_at', { ascending: true });
      if (data?.length) setMessages(data as Message[]);
    };
    void loadMessages();
  }, []);

  const sendMessage = async (event: SyntheticEvent, preset?: string) => {
    event.preventDefault();
    const question = (preset || input).trim();
    if (!question || saving) return;
    const sessionId = window.localStorage.getItem(sessionKey) || crypto.randomUUID();
    window.localStorage.setItem(sessionKey, sessionId);
    const reply = answerQuestion(question);
    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', message: question };
    const assistantMessage: Message = { id: crypto.randomUUID(), role: 'assistant', message: reply };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput(''); setSaving(true); setError('');
    const { error: saveError } = await supabase.from('restaurant_ai_messages').insert([{ session_id: sessionId, role: 'user', message: question }, { session_id: sessionId, role: 'assistant', message: reply }]);
    if (saveError) setError('Your answer is ready, but this conversation could not be saved.');
    setSaving(false);
  };

  return <><button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[#e0a82e] px-5 py-3 text-[#0d0b08] shadow-2xl shadow-black/30 hover:bg-[#f0c248] transition-all" aria-label="Open AI concierge"><Bot size={20} /><span className="text-sm font-semibold">AI Concierge</span></button>{open && <div className="fixed inset-0 z-[70] bg-black/40" onClick={() => setOpen(false)}><aside className="absolute right-0 top-0 h-full w-full max-w-md bg-[#13100b] border-l border-[#3b2e1a] shadow-2xl flex flex-col" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b border-[#3b2e1a] p-5"><div className="flex items-center gap-3"><div className="rounded-full bg-[#e0a82e] p-2 text-[#0d0b08]"><Sparkles size={18} /></div><div><h2 className="font-serif text-2xl text-[#f3ead7]">Saffron Concierge</h2><p className="text-xs text-[#9a8a6c]">Restaurant questions, answered</p></div></div><button onClick={() => setOpen(false)} className="text-[#9a8a6c] hover:text-[#f3ead7]" aria-label="Close AI concierge"><X size={21} /></button></div><div className="flex-1 overflow-y-auto p-5 space-y-4">{messages.map((message) => <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'bg-[#e0a82e] text-[#0d0b08]' : 'bg-[#211a10] text-[#d9ccb0] border border-[#3b2e1a]'}`}>{message.message}</div></div>)}{error && <p className="text-xs text-amber-400">{error}</p>}</div><div className="border-t border-[#3b2e1a] p-4"><div className="flex flex-wrap gap-2 mb-3">{prompts.map((prompt) => <button key={prompt} onClick={(event) => void sendMessage(event, prompt)} className="rounded-full border border-[#70521d] px-3 py-1.5 text-xs text-[#d9b65d] hover:bg-[#2a2112]">{prompt}</button>)}</div><form onSubmit={(event) => void sendMessage(event)} className="flex items-center gap-2 rounded-xl border border-[#3b2e1a] bg-[#0d0b08] p-2"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about the restaurant…" className="min-w-0 flex-1 bg-transparent px-2 text-sm text-[#f3ead7] outline-none placeholder:text-[#75684f]" /><button disabled={saving} className="rounded-lg bg-[#e0a82e] p-2 text-[#0d0b08] disabled:opacity-50" aria-label="Send question"><Send size={17} /></button></form></div></aside></div>}</>;
}
