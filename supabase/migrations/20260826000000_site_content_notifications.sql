-- Agrega la configuración de notificaciones (correo que recibe el aviso de
-- cada envío del formulario de contacto), editable desde /admin/site.
update public.site_content
set content = content || '{"notifications": {"notificationEmail": "dougcard94@gmail.com"}}'::jsonb
where id = 'jireh-contractor'
  and not (content ? 'notifications');
