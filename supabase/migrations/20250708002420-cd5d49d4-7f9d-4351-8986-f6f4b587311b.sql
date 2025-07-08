-- Rimuovo tutte le policy che causano ricorsione infinita
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Creo una security definer function per controllare se l'utente è admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT COALESCE(is_admin, false) FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Ricreo la policy usando la security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR ALL
TO authenticated
USING (
  auth.uid() = user_id OR public.is_admin()
);