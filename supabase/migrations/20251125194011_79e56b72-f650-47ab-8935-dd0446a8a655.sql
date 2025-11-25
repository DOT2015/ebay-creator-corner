-- Create validation function for activity_log inserts
CREATE OR REPLACE FUNCTION public.validate_activity_log()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate user_id matches authenticated user
  IF NEW.user_id != auth.uid() THEN
    RAISE EXCEPTION 'Cannot insert activity log for other users';
  END IF;
  
  -- Validate action field (max 100 chars, no special chars except underscore/hyphen)
  IF NEW.action !~ '^[a-zA-Z0-9_-]{1,100}$' THEN
    RAISE EXCEPTION 'Invalid action format';
  END IF;
  
  -- Validate entity_type field (max 50 chars)
  IF LENGTH(NEW.entity_type) > 50 THEN
    RAISE EXCEPTION 'Entity type too long';
  END IF;
  
  -- Validate IP address format if provided
  IF NEW.ip_address IS NOT NULL THEN
    -- Basic IPv4/IPv6 validation
    IF NEW.ip_address !~ '^([0-9]{1,3}\.){3}[0-9]{1,3}$' 
       AND NEW.ip_address !~ '^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$' THEN
      RAISE EXCEPTION 'Invalid IP address format';
    END IF;
  END IF;
  
  -- Validate details JSONB size (max 10KB)
  IF NEW.details IS NOT NULL THEN
    IF pg_column_size(NEW.details) > 10240 THEN
      RAISE EXCEPTION 'Details field too large (max 10KB)';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for validation
DROP TRIGGER IF EXISTS validate_activity_log_trigger ON public.activity_log;
CREATE TRIGGER validate_activity_log_trigger
  BEFORE INSERT ON public.activity_log
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_activity_log();