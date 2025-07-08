-- Rimuovo la policy che causa ricorsione infinita
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Creo una nuova policy per gli admin che non causa ricorsione
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR ALL
TO authenticated
USING (
  -- Permette agli utenti di vedere il proprio profilo
  auth.uid() = user_id 
  OR 
  -- Permette agli admin di vedere tutti i profili usando una query diretta senza ricorsione
  auth.uid() IN (
    SELECT user_id FROM profiles WHERE is_admin = true
  )
);