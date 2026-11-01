# Segurança

Cookies de sessão devem ser HttpOnly, Secure e SameSite adequado. As ações mutáveis exigem proteção CSRF e autorização server-side. URLs de análise bloqueiam localhost, redes privadas e metadata endpoints antes e após redirects; têm DNS validado, timeout, limites de redirects e de bytes. Arquivos exigem limite, MIME/assinatura válidos e nomes seguros.
