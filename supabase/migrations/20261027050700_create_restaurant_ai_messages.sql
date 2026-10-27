/*
# Create restaurant AI concierge messages

1. New Tables
- `restaurant_ai_messages`
- `id` uniquely identifies each saved chat message.
- `session_id` groups messages from one visitor conversation.
- `role` identifies whether the message came from the guest or concierge.
- `message` stores the question or answer text.
- `created_at` records when the message was saved.

2. Security
- Row Level Security is enabled.
- This single-tenant restaurant site has no sign-in screen, so anon and authenticated roles can save and read public concierge conversations.
- Separate CRUD policies and explicit grants are added.

3. Important Notes
- The concierge uses restaurant-specific answers in the website today, while the saved message history provides a backend foundation for future AI provider integration.
*/

CREATE TABLE IF NOT EXISTS public.restaurant_ai_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS restaurant_ai_messages_session_id_idx ON public.restaurant_ai_messages (session_id, created_at);

ALTER TABLE public.restaurant_ai_messages ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.restaurant_ai_messages TO anon, authenticated;

DROP POLICY IF EXISTS "Public can select concierge messages" ON public.restaurant_ai_messages;
CREATE POLICY "Public can select concierge messages" ON public.restaurant_ai_messages FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public can insert concierge messages" ON public.restaurant_ai_messages;
CREATE POLICY "Public can insert concierge messages" ON public.restaurant_ai_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Public can update concierge messages" ON public.restaurant_ai_messages;
CREATE POLICY "Public can update concierge messages" ON public.restaurant_ai_messages FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Public can delete concierge messages" ON public.restaurant_ai_messages;
CREATE POLICY "Public can delete concierge messages" ON public.restaurant_ai_messages FOR DELETE TO anon, authenticated USING (true);
